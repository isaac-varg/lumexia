"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createPricingExamNote = async (data: Prisma.PricingExaminationNoteUncheckedCreateInput) => {
    const res = await prisma.pricingExaminationNote.create({
        data,
    });

    return res
}
