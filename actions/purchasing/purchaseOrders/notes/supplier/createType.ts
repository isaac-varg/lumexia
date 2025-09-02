'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createPoSupplierNoteType = async (data: Prisma.PoSupplierNoteTypeUncheckedCreateInput) => {
  const res = await prisma.poSupplierNoteType.create({ data });
  return res;
}
