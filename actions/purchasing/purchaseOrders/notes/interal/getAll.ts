'use server'

import prisma from "@/lib/prisma"

export const getInternalNotes = async (poId: string) => {
  const notes = await prisma.purchaseOrderNote.findMany({
    where: {
      purchaseOrderId: poId,
    },
    include: {
      noteType: true,
      user: true,
    }
  });

  return notes;
}

export type PoInternalNote = Awaited<ReturnType<typeof getInternalNotes>>[number];
