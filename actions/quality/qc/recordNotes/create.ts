"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { createNoteFiles } from "@/actions/notes/createNoteFiles"

export const createRecordNote = async (data: Prisma.QcRecordNoteUncheckedCreateInput, fileIds: string[] = []) => {
  const response = await prisma.qcRecordNote.create({
    data,
    include: {
      user: true,
      noteType: true
    }
  });
  await createNoteFiles('qcRecordNoteFile', response.id, fileIds)
  return response
}
