"use server"

import prisma from "@/lib/prisma"

export const getItemPricingData = async (itemId: string) => {
    
    const response = await prisma.itemPricingData.findFirst({
        where: {
            itemId,
        },
        include: {
            upcomingPriceUom: true,
        }
    })

    return response
}

export type ItemPricingData = Awaited<ReturnType<typeof getItemPricingData>>


