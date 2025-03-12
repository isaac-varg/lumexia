'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createExaminationNoteType = async (data: Prisma.PricingExaminationNoteTypeUncheckedCreateInput) => {

    const response = await prisma.pricingExaminationNoteType.create({
        data,
    })

    return response;
}
