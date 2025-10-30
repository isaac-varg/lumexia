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

export const handleCompletedBprCascade = async (bprId: string) => {
  try {
    const bpr = await bprActions.getOne(bprId);
    if (!bpr) {
      throw new Error(`BPR with id ${bprId} not found.`);
    }

    const stagings = await getStagings(bprId);
    const userId = await getUserId();

    await prisma.$transaction(async (tx) => {
      await Promise.all(stagings.map((staging) => processStaging(staging, userId, tx)));

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


const getStagings = async (bprId: string): Promise<ExBprStaging[]> => {
  const stagings = await prisma.bprStaging.findMany({
    where: {
      bprBom: {
        bprId,
      }
    },
    include: {
      bprBom: {
        include: {
          bpr: true
        }
      },
      lot: true,
      pulledByUser: true,
      uom: true,
      status: true,
    }
  })

  return stagings as unknown as ExBprStaging[];
}

const processStaging = async (staging: ExBprStaging, userId: string, tx: Prisma.TransactionClient) => {
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

const createTransaction = async (staging: ExBprStaging, userId: string, tx: Prisma.TransactionClient) => {

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

