'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createLotNoteType = async (data: Prisma.LotNoteTypeUncheckedCreateInput) => {
  const response = await prisma.lotNoteType.create({ data, })
  return response
}
