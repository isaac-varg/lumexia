'use server'

import prisma from "@/lib/prisma"

export const getAllAuxiliaries = async () => {
    const auxiliaries = await prisma.finishedProductAuxiliary.findMany({
        include: {
            auxiliaryItem: {
                include: {
                    itemPricingData: {
                        include: {
                            upcomingPriceUom: true,
                        },
                    },
                    aliases: true,
                    itemType: true,
                },
            },
        },
    })


    return auxiliaries
};

export type FinishedProductAuxiliary = Awaited<ReturnType<typeof getAllAuxiliaries>>[number]; 
