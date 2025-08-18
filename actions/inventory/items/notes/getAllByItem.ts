"use server"

import prisma from "@/lib/prisma"

export const getAllItemNotesByItem = async (itemId: string) => {

  const notes = await prisma.itemNote.findMany({
    where: {
      itemId,
    },
    include: {
      noteType: true,
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    }
  });

  return notes;
}

export type ItemNote = Awaited<ReturnType<typeof getAllItemNotesByItem>>[number];
