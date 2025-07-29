"use server"

import prisma from "@/lib/prisma"

export const getAuditItemNotes = async (auditItemId: string) => {
    const notes = await prisma.discrepancyAuditItemNote.findMany({
        where: {
            auditItemId,
        },
        include: {
            noteType: true,
            user: true
        }
    })

    return notes;
}

export type AuditItemNote = Awaited<ReturnType<typeof getAuditItemNotes>>[number];
