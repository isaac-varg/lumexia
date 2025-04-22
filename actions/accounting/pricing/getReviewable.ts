"use server"

import prisma from "@/lib/prisma"

export const getReviewablePricingExams = async ( ) => {
    const exams = await prisma.pricingExamination.findMany({
        where: {
            approved: false
        },
        include: {
            examinedItem: true,
            user: true,
        }
    });

    return exams
}

export type ReviewablePricingExams = Awaited<ReturnType<typeof getReviewablePricingExams>>[number]
