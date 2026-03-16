'use server'

import prisma from "@/lib/prisma"
import { resolveNoteFiles } from "@/actions/notes/resolveNoteFiles"

export const getInternalNotes = async (poId: string) => {
  const notes = await prisma.purchaseOrderNote.findMany({
    where: {
      purchaseOrderId: poId,
    },
    include: {
      noteType: true,
      user: true,
      files: { include: { file: true } },
    }
  });

  return resolveNoteFiles(notes);
}

export type PoInternalNote = Awaited<ReturnType<typeof getInternalNotes>>[number];
