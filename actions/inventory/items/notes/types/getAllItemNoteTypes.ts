"use server"

import prisma from "@/lib/prisma"

export const getAllItemNoteTypes = async () => {

  const types = await prisma.itemNoteType.findMany();

  return types
}

export type ItemNoteType = Awaited<ReturnType<typeof getAllItemNoteTypes>>[number]
