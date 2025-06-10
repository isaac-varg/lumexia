"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createRecordNote = async (data: Prisma.QcRecordNoteUncheckedCreateInput) => {
    const response = await prisma.qcRecordNote.create({
        data,
        include: {
            createdBy: true,
            noteType: true
        }
    });

    return response
}
