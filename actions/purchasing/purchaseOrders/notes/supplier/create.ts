'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createPoSupplierNote = async (data: Prisma.PoSupplierNoteUncheckedCreateInput) => {
  const res = await prisma.poSupplierNote.create({ data });

  return res;
}
