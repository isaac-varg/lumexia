'use server'

import prisma from "@/lib/prisma"

export const getAuditItemNoteTypes = async () => {
    const types = await prisma.discrepancyAuditItemNoteType.findMany();

    return types

}

export type AuditItemNoteType = Awaited<ReturnType<typeof getAuditItemNoteTypes>>[number]
