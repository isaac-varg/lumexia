"use server"

import prisma from "@/lib/prisma"

export const getAuditRequestNoteTypes = async () => {
    const types = await prisma.auditRequestNoteType.findMany();
    
    return types
}

export type AuditRequestNoteType = Awaited<ReturnType<typeof getAuditRequestNoteTypes>>[number]
