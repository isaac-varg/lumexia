"use server"

import prisma from "@/lib/prisma"
import { resolveNoteFiles } from "@/actions/notes/resolveNoteFiles"

export const getAllRecordNotesByRecord = async (recordId: string) => {

  const notes = await prisma.qcRecordNote.findMany({
    where: {
      recordId,
    },
    include: {
      user: true,
      noteType: true,
      files: { include: { file: true } },
    }
  });

  return resolveNoteFiles(notes);
}

export type QcRecordNote = Awaited<ReturnType<typeof getAllRecordNotesByRecord>>[number]
