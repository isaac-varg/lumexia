'use server'

import prisma from "@/lib/prisma";

export const getAllByItemType = async (itemTypeId: string) => {
    const templates = await prisma.pricingTemplate.findMany({
        where: {
            forItemTypeId: itemTypeId,
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
    });

    return templates
}
