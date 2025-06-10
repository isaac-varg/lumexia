"use server"

import prisma from "@/lib/prisma"

export const getAllRecordNotesByRecord = async (recordId: string) => {

    const notes = await prisma.qcRecordNote.findMany({
        where: {
            qcRecordId: recordId,
        },
        include: {
            createdBy: true,
            noteType: true,
        }
    });

    return notes;
}

export type QcRecordNote = Awaited<ReturnType<typeof getAllRecordNotesByRecord>>[number]
