"use server"

import prisma from "@/lib/prisma"

export const getAllPricingExaminationsByItem = async (examinedItemId: string) => {

    const examinations = await prisma.pricingExamination.findMany({
        where: {
            examinedItemId,
        },
        include: {
            user: true,
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
        }
    });



    return examinations;
}

export type PricingExamination = Awaited<ReturnType<typeof getAllPricingExaminationsByItem>>[number];
