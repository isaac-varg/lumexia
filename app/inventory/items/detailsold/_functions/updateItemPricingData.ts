'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"


export const updateItemPricingData = async (id: string, data: Prisma.ItemPricingDataUncheckedUpdateInput) => {

    const response = await prisma.itemPricingData.update({
        where: {
            id,
        },
        data,
    })

    return response
}
