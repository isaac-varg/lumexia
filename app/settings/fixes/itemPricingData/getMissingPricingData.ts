'use server'

import prisma from "@/lib/prisma"


export const getMissingPricingData = async () => {

    const missing = await prisma.item.findMany({
        where: {
            itemPricingData: {
                none: {}
            }
        }
    })

    return missing;
}


