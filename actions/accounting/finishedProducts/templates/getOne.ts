'use server'

import prisma from "@/lib/prisma"

export const getOnePricingTemplate = async (id: string) => {
    const template = await prisma.pricingTemplate.findFirst({
        where: {
            id,
        },
        include: {
            forItemType: true,
            finishedProducts: {
                include: {
                    fillUom: true,
                    auxiliaries: {
                        include: {
                            auxiliaryItem: true
                        }
                    }
                }
            }
        }

    })

    return template;
}
