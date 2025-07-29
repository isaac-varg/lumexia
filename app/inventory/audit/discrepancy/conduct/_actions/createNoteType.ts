'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createNoteType = async (data: Prisma.DiscrepancyAuditItemNoteTypeUncheckedCreateInput) => {
    const res = await prisma.discrepancyAuditItemNoteType.create({
        data,
    })
    return res
}
