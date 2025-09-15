'use server'

import prisma from "@/lib/prisma"

export const getAllPoSupplierNoteTypes = async () => {
  const types = await prisma.poSupplierNoteType.findMany();
  return types;
}

export type PoSupplierNoteType = Awaited<ReturnType<typeof getAllPoSupplierNoteTypes>>[number];
