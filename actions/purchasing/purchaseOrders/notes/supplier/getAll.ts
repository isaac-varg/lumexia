'use server'

import prisma from "@/lib/prisma"
import { resolveNoteFiles } from "@/actions/notes/resolveNoteFiles"

export const getAllPoSupplierNotes = async (supplierId: string) => {
  const notes = await prisma.poSupplierNote.findMany({
    where: {
      supplierId,
    },
    include: {
      noteType: true,
      user: true,
      files: { include: { file: true } },
    },
  });

  return resolveNoteFiles(notes);
}

export type PoSupplierNote = Awaited<ReturnType<typeof getAllPoSupplierNotes>>[number];
