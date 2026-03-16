'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { createNoteFiles } from "@/actions/notes/createNoteFiles"

export const createGeneralRequestNote = async (data: Prisma.GeneralRequestNoteUncheckedCreateInput, fileIds: string[] = []) => {

    const res = await prisma.generalRequestNote.create({
        data,
    })
    await createNoteFiles('generalRequestNoteFile', res.id, fileIds)
    return res
}
