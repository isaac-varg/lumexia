"use server"

import prisma from "@/lib/prisma"
import { ExBprStaging } from "@/types/bprStaging";
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

export const handleCompletedBprCascade = async (bprId: string) => {

  try {
    const bpr = await bprActions.getOne(bprId);

    if (!bpr) {
      throw new BprConsumptionError('BPR_NOT_FOUND', `BPR with id ${bprId} not found.`, { bprId, });
    }

    const stagings = await getStagings(bprId);
    const userId = await getUserId();

    if (stagings instanceof BprConsumptionError) {
      throw stagings;
    }

    await prisma.$transaction(async (tx) => {
      await Promise.all(stagings.map(async (staging) => processStaging(staging, userId, tx)));

      await tx.batchProductionRecord.update({
        where: { id: bprId },
        data: { bprStatusId: bprStatuses.awaitingQc },
      });
    });

    await createActivityLog('cascadeBprCompletion', 'bpr', bprId, { context: `BPR #${bpr.referenceCode} completion cascade executed.` });

  } catch (error) {
    console.error("Failed to execute BPR completion cascade:", error);
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
    return error as BprConsumptionError;
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

