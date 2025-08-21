'use server'

import prisma from "@/lib/prisma"

export const getAllLotNotesByLot = async (lotId: string) => {
  const notes = await prisma.lotNote.findMany({
    where: {
      lotId,
    },
    include: {
      user: true,
      noteType: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return notes;
}

export type LotNote = Awaited<ReturnType<typeof getAllLotNotesByLot>>[number]
