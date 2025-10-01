"use server"

import transactionActions from "@/actions/inventory/transactions";
import bprActions from "@/actions/production/bprActions";
import bprBomActions from "@/actions/production/bprBom";
import bprStagingActions from "@/actions/production/bprStagings";
import { getUserId } from "@/actions/users/getUserId";
import { staticRecords } from "@/configs/staticRecords";
import { bprStagingStatuses } from "@/configs/staticRecords/bprStagingStatuses";
import { bprStatuses } from "@/configs/staticRecords/bprStatuses";
import { transactionTypes } from "@/configs/staticRecords/transactionTypes";
import { uom } from "@/configs/staticRecords/unitsOfMeasurement";
import prisma from "@/lib/prisma"
import { ExBprStaging } from "@/types/bprStaging";
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";

export const updateCompletedBprCascade = async (bprId: string) => {

  const stagings = await getStagings(bprId);
  const bpr = await bprActions.getOne(bprId);



  await Promise.all(stagings.map((staging) => processStaging(staging as any)));

  await bprActions.update({ id: bprId }, { bprStatusId: bprStatuses.awaitingQc })

  await createActivityLog('cascadeBprCompletion', 'bpr', bprId, { context: `BPR #${bpr.referenceCode} completion cascade executed.` })

}


const getStagings = async (bprId: string) => {
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
      }
    }
  })

  return stagings

}

const processStaging = async (staging: ExBprStaging) => {
  await createTransaction(staging.lotId, staging.quantity, staging.bprBom.bpr.referenceCode, staging.id)
  await bprBomActions.update({ id: staging.bprBomId }, { statusId: bprStagingStatuses.consumed })
  await bprStagingActions.update({ id: staging.id }, { bprStagingStatusId: bprStagingStatuses.consumed })


}

const createTransaction = async (lotId: string, amount: number, bprReferenceCode: number, stagingId: string) => {

  const userId = await getUserId();

  const transactionPayload = {
    lotId: lotId,
    transactionTypeId: transactionTypes.bprConsumption,
    userId,
    uomId: uom.pounds,
    amount,
    systemNote: `Consumed by BPR# ${bprReferenceCode}`,
    userNote: "",
  };

  const transaction = await transactionActions.createNew(transactionPayload)

  // create bpr staging consumption

  await prisma.bprStagingConsumption.create({
    data: {
      transactionId: transaction.id,
      bprStagingId: stagingId,
    }
  })

}

