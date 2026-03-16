'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { createNoteFiles } from "@/actions/notes/createNoteFiles"

export const createNote = async (data: Prisma.DiscrepancyAuditItemNoteUncheckedCreateInput, fileIds: string[] = []) => {
    const res = await prisma.discrepancyAuditItemNote.create({
        data,
    });
    await createNoteFiles('discrepancyAuditItemNoteFile', res.id, fileIds)
    return res
}
