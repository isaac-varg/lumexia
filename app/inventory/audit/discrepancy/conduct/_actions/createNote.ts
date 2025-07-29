'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createNote = async (data: Prisma.DiscrepancyAuditItemNoteUncheckedCreateInput) => {
    const res = await prisma.discrepancyAuditItemNote.create({
        data,
    });

    return res
}
