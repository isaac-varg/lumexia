'use server'

import prisma from "@/lib/prisma"

export const getByFinishedProduct = async (finishedProductId: string) => {
    const existingAuxiliaries = await prisma.pricingTemplateAuxiliary.findMany({
        where: {
            apartOfPricingTemplateFinishedProductId: finishedProductId,
        },
        include: {
            auxiliaryItem: true
        }
    })

    return existingAuxiliaries
}
