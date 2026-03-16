'use server'

import prisma from "@/lib/prisma"
import { resolveNoteFiles } from "@/actions/notes/resolveNoteFiles"

export const getAllByExamId = async (pricingExaminationId: string) => {

    const notes = await prisma.pricingExaminationNote.findMany({
        where: {
            pricingExaminationId,
        },
        include: {
            user: true,
            noteType: true,
            files: { include: { file: true } },
        }
    })

    return resolveNoteFiles(notes);
}

export type PricingExaminationNote = Awaited<ReturnType<typeof getAllByExamId>>[number]
