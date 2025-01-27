'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"

export const createPoItemDetails = async (data: Prisma.PurchaseOrderItemDetailUncheckedCreateInput) => {
    const response = await prisma.purchaseOrderItemDetail.create({
        data,
    })

    revalidatePath('/purchasing/requests/[referenceCode]')
    return response;
}
