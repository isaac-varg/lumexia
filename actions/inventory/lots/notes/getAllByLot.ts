'use server'

import prisma from "@/lib/prisma"
import { resolveNoteFiles } from "@/actions/notes/resolveNoteFiles"

export const getAllLotNotesByLot = async (lotId: string) => {
  const notes = await prisma.lotNote.findMany({
    where: {
      lotId,
    },
    include: {
      user: true,
      noteType: true,
      files: { include: { file: true } },
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return resolveNoteFiles(notes);
}

export type LotNote = Awaited<ReturnType<typeof getAllLotNotesByLot>>[number]
