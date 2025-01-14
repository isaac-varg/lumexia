"use server"

import prisma from "@/lib/prisma"
import { MaterialsBom } from "../_components/MaterialSufficiency"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";
import { staticRecords } from "@/configs/staticRecords";
import { DateTime } from "luxon";

export const createRequest = async (material: MaterialsBom, priorityId: string) => {

    const allocatedBprIds = material.allocated.map((bprBom) => bprBom.id);
    const pendingPoIds = material.purchases.filter((po) => po.purchaseOrderStatusId !== staticRecords.purchasing.poStatuses.received).map((po) => po.id)
    const week = DateTime.now().toFormat("WW")

    const purchasingRequest = await prisma.purchasingRequest.create({
        data: {
            statusId: '226db3a6-2756-4a5d-a6c5-b741339baeea',
            itemId: material.bom.itemId,
            title: `${material.bom.item.name} <${week}>`,
            priorityId,

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
            warningOverridden: false,
            warningShown: false,
        }
    });


    await createActivityLog("createPurchasingRequest", 'requestId', purchasingRequest.id, { context: `Request made for ${material.bom.item.name}`, snapshotId: snapshot.id })


}
