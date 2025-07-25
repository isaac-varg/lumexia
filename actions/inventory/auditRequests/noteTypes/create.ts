"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createAuditRequestNoteType = async (data: Prisma.AuditRequestNoteTypeUncheckedCreateInput) => {

    const response = await prisma.auditRequestNoteType.create({
        data,
    })


    return response
}



