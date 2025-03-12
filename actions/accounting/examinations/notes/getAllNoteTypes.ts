"use server"

import prisma from "@/lib/prisma"


export const getAllNoteTypes = async () => {
    const types = await prisma.pricingExaminationNoteType.findMany()

    return types;
}

export type PricingExaminationNoteType = Awaited<ReturnType<typeof getAllNoteTypes>>[number]
