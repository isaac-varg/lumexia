"use server"

import { revalidatePage } from "@/actions/app/revalidatePage"
import { staticRecords } from "@/configs/staticRecords"
import prisma from "@/lib/prisma"

export const createLinkedPo = async (data: {
    requestId: string,
    poId: string,
}, poItemId: string) => {

    const response = await prisma.requestPurchaseOrder.create({
        data,
    })


    const itemDetails = await prisma.purchaseOrderItemDetail.create({
        data: {
            poItemId,
            quantityOfContainers: 0,
            weightUomId: staticRecords.inventory.uom.lb,
            containerTypeId: staticRecords.inventory.containerTypes.drum,
            weightPerContainer: 0,
        }
    });


    revalidatePage("/purchasing/request/[referenceCode]/")

    return response;
}

