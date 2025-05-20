'use server'

import prisma from "@/lib/prisma"

export const getProducedPricingByItem = async (itemId: string) => {

    const examinations = await prisma.pricingExamination.findMany({
        where: {
            examinedItemId: itemId,
        },
        include: {
            producedPricingDataArchives: true,
            BomPricingDataArchive: {
                include: {
                    item: true
                }
            }

        },
    })


    return examinations

};

export type ProducedPricingExaminationForDashboard = Awaited<ReturnType<typeof getProducedPricingByItem>>[number]


