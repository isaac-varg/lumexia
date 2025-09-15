"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createItemNoteType = async (data: Prisma.ItemNoteTypeUncheckedCreateInput) => {
  const response = await prisma.itemNoteType.create({
    data,
  });

  return response
}
