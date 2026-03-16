'use server'

import prisma from "@/lib/prisma"
import { resolveNoteFiles } from "@/actions/notes/resolveNoteFiles"

export const getPoPublicNotes = async (poId: string) => {
  const notes = await prisma.poPublicNote.findMany({
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

export type PoPublicNote = Awaited<ReturnType<typeof getPoPublicNotes>>[number];
