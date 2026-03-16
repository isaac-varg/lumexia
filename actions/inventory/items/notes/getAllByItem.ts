"use server"

import prisma from "@/lib/prisma"
import { resolveNoteFiles } from "@/actions/notes/resolveNoteFiles"

export const getAllItemNotesByItem = async (itemId: string) => {

  const notes = await prisma.itemNote.findMany({
    where: {
      itemId,
    },
    include: {
      noteType: true,
      user: true,
      files: { include: { file: true } },
    },
    orderBy: {
      createdAt: 'desc',
    }
  });

  return resolveNoteFiles(notes);
}

export type ItemNote = Awaited<ReturnType<typeof getAllItemNotesByItem>>[number];
