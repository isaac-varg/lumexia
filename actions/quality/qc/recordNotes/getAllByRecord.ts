"use server"

import prisma from "@/lib/prisma"

export const getAllRecordNotesByRecord = async (recordId: string) => {

  const notes = await prisma.qcRecordNote.findMany({
    where: {
      recordId,
    },
    include: {
      user: true,
      noteType: true,
    }
  });

  return notes;
}

export type QcRecordNote = Awaited<ReturnType<typeof getAllRecordNotesByRecord>>[number]
