'use server'

import prisma from "@/lib/prisma"

export const getAllPoSupplierNotes = async (supplierId: string) => {
  const notes = await prisma.poSupplierNote.findMany({
    where: {
      supplierId,
    },
    include: {
      noteType: true,
      user: true,
    },
  });

  return notes;
}

export type PoSupplierNote = Awaited<ReturnType<typeof getAllPoSupplierNotes>>[number];
