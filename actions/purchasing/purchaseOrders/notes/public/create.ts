'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { createNoteFiles } from "@/actions/notes/createNoteFiles"

export const createPoPublicNote = async (data: Prisma.PoPublicNoteUncheckedCreateInput, fileIds: string[] = []) => {
  const res = await prisma.poPublicNote.create({
    data,
  });
  await createNoteFiles('poPublicNoteFile', res.id, fileIds)
  return res;
}
