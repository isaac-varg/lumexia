"use server"

import prisma from "@/lib/prisma"

export const getOnePricingExamination = async (id: string) => {
    const exam = await prisma.pricingExamination.findFirstOrThrow({
        where: {
            id,
        },
        include: {
            examinedItem: {
                include: {
                    procurementType: true,
                    itemType: true,
                }
            },
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
            producedPricingDataArchives: {
                include: {
                    bomPricingDataArchives: {
                        include: {
                            item: true
                        }
                    }
                }
            }
        },
    });

    return exam
}

export type SinglePricingExaminationCombined = Awaited<ReturnType<typeof getOnePricingExamination>>
