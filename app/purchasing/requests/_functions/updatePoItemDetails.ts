'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const updatePoItemDetails = async (poItemDetailsId: string, data: Prisma.PurchaseOrderItemDetailUncheckedUpdateInput) => {
    
    const reponse = await prisma.purchaseOrderItemDetail.update({
        where: {
            id: poItemDetailsId,
        },
        data,
    })

    return reponse;
}
