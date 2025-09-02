'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createPoPublicNoteType = async (data: Prisma.PoPublicNoteTypeUncheckedCreateInput) => {
  const res = await prisma.poPublicNoteType.create({ data });
  return res;
}
