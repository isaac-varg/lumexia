"use server"

import prisma from "@/lib/prisma"

export const getAllPricingExaminations = async (limit?: number) => {

    const examinations = await prisma.pricingExamination.findMany({
        include: {
            examinedItem: true,
            user: true,
            status: true,
            itemPricingDataArchive: true,
            filledConsumerContainerArchives: {
                include: {
                    consumerContainerArchive: {
                        include: {
                            containerItem: true
                        }
                    },
                }
            },
        },
        orderBy: {
            createdAt: 'desc'
        },
        ...(limit ? { take: limit } : {})
    });



    return examinations;
}

export type PricingExaminationAll = Awaited<ReturnType<typeof getAllPricingExaminations>>[number];
