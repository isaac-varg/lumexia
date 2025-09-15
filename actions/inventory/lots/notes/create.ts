'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createLotNote = async (data: Prisma.LotNoteUncheckedCreateInput) => {
  const res = await prisma.lotNote.create({ data, })
  return res;
}
