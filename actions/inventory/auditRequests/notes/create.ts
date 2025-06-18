'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createAuditRequestNote = async (data: Prisma.AuditRequestNoteUncheckedCreateInput) => {
    const response = await prisma.auditRequestNote.create({
        data,
    });

    return response
};
