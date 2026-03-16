"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { createNoteFiles } from "@/actions/notes/createNoteFiles"

export const createPricingExamNote = async (data: Prisma.PricingExaminationNoteUncheckedCreateInput, fileIds: string[] = []) => {
    const res = await prisma.pricingExaminationNote.create({
        data,
    });
    await createNoteFiles('pricingExaminationNoteFile', res.id, fileIds)
    return res
}
