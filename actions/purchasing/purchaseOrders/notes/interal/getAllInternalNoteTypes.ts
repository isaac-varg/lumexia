'use server'

import prisma from "@/lib/prisma"

export const getAllInternalNoteTypes = async () => {
  const types = await prisma.purchaseOrderNoteType.findMany();
  return types;
}

export type PoInternalNoteType = Awaited<ReturnType<typeof getAllInternalNoteTypes>>[number];
