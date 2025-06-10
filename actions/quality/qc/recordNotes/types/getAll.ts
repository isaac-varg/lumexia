'use server'

import prisma from "@/lib/prisma"

export const getAllQcRecordNoteTypes = async () => {
    const types = await prisma.qcRecordNoteType.findMany();
    return types;
}


export type QcRecordNoteType = Awaited<ReturnType<typeof getAllQcRecordNoteTypes>>[number]

