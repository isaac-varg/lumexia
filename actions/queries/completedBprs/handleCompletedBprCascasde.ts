"use server"

import transactionActions from "@/actions/inventory/transactions";
import bprActions from "@/actions/production/bprActions";
import bprBomActions from "@/actions/production/bprBom";
import bprStagingActions from "@/actions/production/bprStagings";
import { getUserId } from "@/actions/users/getUserId";
import { staticRecords } from "@/configs/staticRecords";
import prisma from "@/lib/prisma"
import { ExBprStaging } from "@/types/bprStaging";
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";

export const handleCompletedBprCascade = async (bprId: string) => {

    const stagings = await getStagings(bprId);
    const bpr = await bprActions.getOne(bprId);



    await Promise.all(stagings.map((staging) => processStaging(staging as any)));

    await bprActions.update({ id: bprId }, { bprStatusId: staticRecords.production.bprStatuses.awaitingQc })

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
    await createTransaction(staging.lotId, staging.quantity, staging.bprBom.bpr.referenceCode)
    await bprBomActions.update({ id: staging.bprBomId }, { statusId: staticRecords.production.bprBomStatuses.consumed })
    await bprStagingActions.update({ id: staging.id }, { bprStagingStatusId: staticRecords.production.bprStagingStatuses.consumed })


}

const createTransaction = async (lotId: string, amount: number, bprReferenceCode: number) => {

    const userId = await getUserId();

    const transactionPayload = {
        lotId: lotId,
        transactionTypeId: staticRecords.inventory.transactionTypes.bprConsumption,
        userId,
        uomId: staticRecords.inventory.uom.lb,
        amount,
        systemNote: `Consumed by BPR# ${bprReferenceCode}`,
        userNote: "",
    };

    await transactionActions.createNew(transactionPayload)
}

