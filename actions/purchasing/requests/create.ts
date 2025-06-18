"use server"

import prisma from "@/lib/prisma"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";
import { staticRecords } from "@/configs/staticRecords";
import { DateTime } from "luxon";
import { getUserId } from "@/actions/users/getUserId";
import { BprBomItemInventory } from "@/actions/inventory/inventory/getAllByBom";

export const createRequest = async (material: BprBomItemInventory, priorityId: string, wasOverridden: boolean) => {


    const requestingUserId = await getUserId()
    const allocatedBprIds =  material.allocated.map((bprBom) => bprBom.bpr.id);
    const pendingPoIds = material.purchases.filter((po) => po.purchaseOrderStatusId !== staticRecords.purchasing.poStatuses.received).map((po) => po.id)
    const week = DateTime.now().toFormat("WW")

    const purchasingRequest = await prisma.purchasingRequest.create({
        data: {
            statusId: '226db3a6-2756-4a5d-a6c5-b741339baeea',
            itemId: material.bom.itemId,
            title: `${material.bom.item.name} <Week ${week}>`,
            priorityId,
            requestingUserId,

        }
    });

    const snapshot = await prisma.requestInventorySnapshot.create({
        data: {
            requestId: purchasingRequest.id,
            objectName: '',
            onHandQuantity: material.totalQuantityOnHand,
            allocatedQuantity: material.totalQuantityAllocated,
            availableQuantity: material.totalQuantityAvailable,
            allocatedBprIds,
            pendingPoIds,
            warningOverridden: wasOverridden,
            warningShown: wasOverridden,
        }
    });


    await createActivityLog("createPurchasingRequest", 'requestId', purchasingRequest.id, { context: `Request made for ${material.bom.item.name}`, snapshotId: snapshot.id })


}
