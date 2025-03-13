"use server"

import prisma from "@/lib/prisma"

export const getAllPricingExaminationsByItem = async (examinedItemId: string) => {

    const examinations = prisma.pricingExamination.findMany({
        where: {
            examinedItemId,
        },
        include: {
            user: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return examinations;
}

export type PricingExamination = Awaited<ReturnType<typeof getAllPricingExaminationsByItem>>[number];
