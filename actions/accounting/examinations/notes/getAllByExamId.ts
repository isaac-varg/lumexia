'use server'

import prisma from "@/lib/prisma"

export const getAllByExamId = async (pricingExaminationId: string) => {

    const notes = await prisma.pricingExaminationNote.findMany({
        where: {
            pricingExaminationId,
        },
        include: {
            user: true,
            noteType: true
        }
    })


    return notes;
}

export type PricingExaminationNote = Awaited<ReturnType<typeof getAllByExamId>>[number]
