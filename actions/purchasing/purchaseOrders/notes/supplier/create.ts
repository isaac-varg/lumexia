'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { createNoteFiles } from "@/actions/notes/createNoteFiles"

export const createPoSupplierNote = async (data: Prisma.PoSupplierNoteUncheckedCreateInput, fileIds: string[] = []) => {
  const res = await prisma.poSupplierNote.create({ data });
  await createNoteFiles('poSupplierNoteFile', res.id, fileIds)
  return res;
}
