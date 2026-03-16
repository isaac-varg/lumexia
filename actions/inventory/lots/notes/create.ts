'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { createNoteFiles } from "@/actions/notes/createNoteFiles"

export const createLotNote = async (data: Prisma.LotNoteUncheckedCreateInput, fileIds: string[] = []) => {
  const res = await prisma.lotNote.create({ data, })
  await createNoteFiles('lotNoteFile', res.id, fileIds)
  return res;
}
