'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { createNoteFiles } from "@/actions/notes/createNoteFiles"

export const createItemNote = async (data: Prisma.ItemNoteUncheckedCreateInput, fileIds: string[] = []) => {
  const response = await prisma.itemNote.create({
    data,
  });
  await createNoteFiles('itemNoteFile', response.id, fileIds)
  return response;
}
