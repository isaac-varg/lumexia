'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createItemNote = async (data: Prisma.ItemNoteUncheckedCreateInput) => {
  const response = await prisma.itemNote.create({
    data,
  });

  return response;
}
