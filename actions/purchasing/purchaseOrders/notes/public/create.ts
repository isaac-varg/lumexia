'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createPoPublicNote = async (data: Prisma.PoPublicNoteUncheckedCreateInput) => {
  const res = await prisma.poPublicNote.create({
    data,
  });

  return res;
}
