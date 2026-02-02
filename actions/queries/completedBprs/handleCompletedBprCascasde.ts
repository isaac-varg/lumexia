"use server"

import prisma from "@/lib/prisma"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";
import { bprStatuses } from "@/configs/staticRecords/bprStatuses";
import { bprStagingStatuses } from "@/configs/staticRecords/bprStagingStatuses";
import { transactionTypes } from "@/configs/staticRecords/transactionTypes";
import { uom } from "@/configs/staticRecords/unitsOfMeasurement";
import { getUserId } from "@/actions/users/getUserId";
import { Prisma } from "@prisma/client";
import bprActions from "@/actions/production/bprActions";
import { productionActions } from "@/actions/production";
import { BprStaging } from "@/actions/production/bprs/stagings/getAll";
import { BprConsumptionError } from "@/utils/errors/BprConsumptionError";
import { bprNoteTypes } from "@/configs/staticRecords/bprNoteTypes";
import { users } from "@/configs/staticRecords/users";

export const handleCompletedBprCascade = async (bprId: string) => {

  try {
    const bpr = await bprActions.getOne(bprId);

    if (!bpr) {
      throw new BprConsumptionError('BPR_NOT_FOUND', `BPR with id ${bprId} not found.`, { bprId, });
    }

    const stagings = await getStagings(bprId);

    if (stagings instanceof BprConsumptionError) {
      throw stagings;
    }

    let userId: string;
    try {
      userId = await getUserId();
    } catch (error) {
      throw new BprConsumptionError('GET_USER_ID_FAILED', 'Could not get user id.', { error });
    }

    // Snapshot staging details before transaction for error reporting
    const stagingDetails = stagings.map((s) => ({
      lotId: s.lotId,
      itemName: s.lot?.lotNumber ?? 'Unknown',
      quantity: Number(s.quantity),
      uom: s.uom?.abbreviation ?? 'lbs',
    }));

    try {
      await prisma.$transaction(async (tx) => {
        const failedStagings: typeof stagingDetails = [];

        for (const staging of stagings) {
          try {
            await processStaging(staging, userId, tx);
          } catch (error) {
            const detail = stagingDetails.find((d) => d.lotId === staging.lotId);
            if (detail) failedStagings.push(detail);
          }
        }

        if (failedStagings.length > 0) {
          throw new BprConsumptionError('TRANSACTION_FAILED', 'One or more stagings failed during BPR consumption.', {
            bprId,
            referenceCode: bpr.referenceCode,
            failedStagings,
          });
        }

        await tx.batchProductionRecord.update({
          where: { id: bprId },
          data: { bprStatusId: bprStatuses.awaitingQc },
        });
      });
    } catch (error) {
      if (error instanceof BprConsumptionError) {
        throw error;
      }
      throw new BprConsumptionError('TRANSACTION_FAILED', 'Failed to execute BPR consumption transaction.', { bprId, referenceCode: bpr.referenceCode, error });
    }


    await createActivityLog('cascadeBprCompletion', 'bpr', bprId, { context: `BPR #${bpr.referenceCode} completion cascade executed.` });

  } catch (error) {
    const consumptionError = error instanceof BprConsumptionError ? error : null;

    console.error(`BprConsumptionError in handleCompletedBprCascade for BPR ${bprId}:`, {
      name: consumptionError?.name ?? 'UnknownError',
      message: consumptionError?.message ?? String(error),
      data: consumptionError?.data,
    });

    // Set BPR status to failed (outside rolled-back transaction)
    try {
      await prisma.batchProductionRecord.update({
        where: { id: bprId },
        data: { bprStatusId: bprStatuses.consumptionError },
      });
    } catch (statusError) {
      console.error(`Failed to set BPR ${bprId} status to failed:`, statusError);
    }

    // Write failure note to BPR
    try {
      const failedStagings = consumptionError?.data?.failedStagings ?? [];
      const stagingLines = failedStagings.map(
        (s) => `  - Lot: ${s.lotId}, Item: ${s.itemName}, Qty: ${s.quantity} ${s.uom}`
      ).join('\n');

      const content = [
        `Error Code: ${consumptionError?.name ?? 'UNKNOWN'}`,
        `Message: ${consumptionError?.message ?? String(error)}`,
        failedStagings.length > 0 ? `Failed Stagings:\n${stagingLines}` : null,
      ].filter(Boolean).join('\n');

      await prisma.bprNote.create({
        data: {
          bprId,
          userId: users.lumexia,
          noteTypeId: bprNoteTypes.cascadeError,
          content,
        },
      });
    } catch (noteError) {
      console.error(`Failed to create failure note for BPR ${bprId}:`, noteError);
    }

    // Write activity log for failure
    try {
      await createActivityLog('cascadeBprCompletionFailed', 'bpr', bprId, {
        errorCode: consumptionError?.name ?? 'UNKNOWN',
        errorMessage: consumptionError?.message ?? String(error),
        failedStagings: consumptionError?.data?.failedStagings ?? [],
      }, true);
    } catch (logError) {
      console.error(`Failed to create activity log for BPR ${bprId} failure:`, logError);
    }

    throw new Error("Failed to execute BPR completion cascade.");
  }
}


const getStagings = async (bprId: string): Promise<BprStaging[] | BprConsumptionError> => {

  try {
    const stagings = await productionActions.bprs.stagings.getAll(bprId);

    if (stagings.length === 0) {
      throw new BprConsumptionError('NO_STAGINGS_FOUND', 'There are no stagings assocaited with this BPR ID.', { bprId, })
    }
    return stagings;
  } catch (error) {
    if (error instanceof BprConsumptionError) {
      return error;
    }
    return new BprConsumptionError('GET_STAGINGS_FAILED', `Failed to get stagings for BPR ${bprId}.`, { bprId, error });
  }

}

const processStaging = async (staging: BprStaging, userId: string, tx: Prisma.TransactionClient) => {
  await createTransaction(staging, userId, tx)
  await tx.bprBillOfMaterials.update({
    where: { id: staging.bprBomId },
    data: { statusId: bprStagingStatuses.consumed }
  })
  await tx.bprStaging.update({
    where: { id: staging.id },
    data: { bprStagingStatusId: bprStagingStatuses.consumed }
  })
}

const createTransaction = async (staging: BprStaging, userId: string, tx: Prisma.TransactionClient) => {

  const transactionPayload = {
    lotId: staging.lotId,
    transactionTypeId: transactionTypes.bprConsumption,
    userId,
    uomId: uom.pounds,
    amount: staging.quantity,
    systemNote: `Consumed by BPR# ${staging.bprBom.bpr.referenceCode}`,
    userNote: "",
  };

  const transaction = await tx.transaction.create({ data: transactionPayload })

  await tx.bprStagingConsumption.create({
    data: {
      transactionId: transaction.id,
      bprStagingId: staging.id,
    }
  })
}
