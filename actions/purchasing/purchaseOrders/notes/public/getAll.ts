'use server'

import prisma from "@/lib/prisma"

export const getPoPublicNotes = async (poId: string) => {
  const notes = await prisma.poPublicNote.findMany({
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

export type PoPublicNote = Awaited<ReturnType<typeof getPoPublicNotes>>[number];
