"use server"

import prisma from "@/lib/prisma"
import { resolveNoteFiles } from "@/actions/notes/resolveNoteFiles"

export const getAuditItemNotes = async (auditItemId: string) => {
    const notes = await prisma.discrepancyAuditItemNote.findMany({
        where: {
            auditItemId,
        },
        include: {
            noteType: true,
            user: true,
            files: { include: { file: true } },
        }
    })

    return resolveNoteFiles(notes);
}

export type AuditItemNote = Awaited<ReturnType<typeof getAuditItemNotes>>[number];
