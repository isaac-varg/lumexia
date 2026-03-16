'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { createNoteFiles } from "@/actions/notes/createNoteFiles"

export const createBprNote = async (data: Prisma.BprNoteUncheckedCreateInput, fileIds: string[] = []) => {
    const res = await prisma.bprNote.create({
        data,
    });
    await createNoteFiles('bprNoteFile', res.id, fileIds)
    return res
}
