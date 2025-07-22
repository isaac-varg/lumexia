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
            FinishedProductArchive: {
                include: {
                    currentFinishedProduct: true,

                },
            },
            PricingExaminationNote: {
                include: {
                    user: true,
                    noteType: true,
                }
            }
        },
    });

    return exam
}

export type SinglePricingExaminationCombined = Awaited<ReturnType<typeof getOnePricingExamination>>


export type SinglePricingFinishedProduct = Awaited<ReturnType<typeof getOnePricingExamination>>["FinishedProductArchive"][number]


export type SinglePricingExamNote = SinglePricingExaminationCombined['PricingExaminationNote'][number];
