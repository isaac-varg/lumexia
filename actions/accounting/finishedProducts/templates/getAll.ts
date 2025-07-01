'use server'

import prisma from "@/lib/prisma"

export const getAllTemplates = async () => {
    const templates = await prisma.pricingTemplate.findMany({
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
    });

    return templates
}

export type PricingTemplate = Awaited<ReturnType<typeof getAllTemplates>>[number]
