'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { createNoteFiles } from "@/actions/notes/createNoteFiles"

export const createAuditRequestNote = async (data: Prisma.AuditRequestNoteUncheckedCreateInput, fileIds: string[] = []) => {
    const response = await prisma.auditRequestNote.create({
        data,
    });
    await createNoteFiles('auditRequestNoteFile', response.id, fileIds)
    return response
};
