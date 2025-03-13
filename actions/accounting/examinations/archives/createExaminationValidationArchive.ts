'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createExaminationValidationArchive = async (data: Prisma.PricingExaminationValidationUncheckedCreateInput) => {
    const response = await prisma.pricingExaminationValidation.create({
        data,
    });

    return response;
}

export type ExaminationValidationPayload = Prisma.PricingExaminationValidationUncheckedCreateInput
