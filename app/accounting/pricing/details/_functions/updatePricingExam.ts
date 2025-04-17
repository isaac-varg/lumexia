'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const updatePricingExam = async (examId: string, data: Prisma.PricingExaminationUncheckedUpdateInput) => {

    const response = await prisma.pricingExamination.update({
        where: {
            id: examId,
        },
        data,
    })

    return response

}

