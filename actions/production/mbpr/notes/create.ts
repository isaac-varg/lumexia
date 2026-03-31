'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { createNoteFiles } from "@/actions/notes/createNoteFiles"

export const createMbprNote = async (data: Prisma.MbprNoteUncheckedCreateInput, fileIds: string[] = []) => {
    const res = await prisma.mbprNote.create({
        data,
    });
    await createNoteFiles('mbprNoteFile', res.id, fileIds)
    return res
}
