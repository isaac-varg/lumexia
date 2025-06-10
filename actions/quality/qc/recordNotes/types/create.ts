'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createQcRecordNoteType = async (data: Prisma.QcRecordNoteTypeUncheckedCreateInput) => {
    const response = await prisma.qcRecordNoteType.create({
        data,
    });

    return response
}
