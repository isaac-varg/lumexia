"use server"

import prisma from "@/lib/prisma"

export const getProducedPricingExaminations = async (itemId: string) => {

    const examinations = await prisma.producedPricingDataArchive.findMany({
        where: {
            examination: {
                examinedItemId: itemId,
            }
        },
        include: {
            examination: {
                include: {
                    examinedItem: true,
                    filledConsumerContainerArchives: {
                        include: {
                            consumerContainerArchive: {
                                include: {
                                    containerItem: true
                                }
                            },
                        }
                    },
                    user: true
                }
            },
            bomPricingDataArchives: {
                include: {
                    item: true
                }
            },
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return examinations;
};

export type ProducedExaminations = Awaited<ReturnType<typeof getProducedPricingExaminations>>[number]
