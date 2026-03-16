'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { createNoteFiles } from "@/actions/notes/createNoteFiles"

export const createAccountingNote = async (data: Prisma.PoAccountingNoteUncheckedCreateInput, fileIds: string[] = []) => {
    const response = await prisma.poAccountingNote.create({
        data,
    });
    await createNoteFiles('poAccountingNoteFile', response.id, fileIds)
    return response
}
