'use server'

import prisma from "@/lib/prisma"

export const getAllLotNoteTypes = async () => {
  const types = await prisma.lotNoteType.findMany();

  return types
}

export type LotNoteType = Awaited<ReturnType<typeof getAllLotNoteTypes>>[number];
