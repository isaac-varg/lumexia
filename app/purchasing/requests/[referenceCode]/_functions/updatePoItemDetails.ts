"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const updatePoItemDetails = async (detailId: string, data: Prisma.PurchaseOrderItemDetailUncheckedUpdateInput) => {


    const update = await prisma.purchaseOrderItemDetail.update({
        where: {
            id: detailId,
        },
        data,
    })

    return update;
}


