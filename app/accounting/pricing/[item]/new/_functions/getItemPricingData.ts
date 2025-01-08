"use server"

import prisma from "@/lib/prisma"

export const getItemPricingData = async (itemId: string) => {
    
    const response = await prisma.itemPricingData.findFirstOrThrow({
        where: {
            itemId,
        }
    })

    return response
}
