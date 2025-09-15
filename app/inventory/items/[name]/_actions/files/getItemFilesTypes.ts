'use server'

import prisma from "@/lib/prisma"

export const getItemFileTypes = async () => {
  const types = await prisma.itemFileType.findMany();

  return types
}

export type ItemFileType = Awaited<ReturnType<typeof getItemFileTypes>>[number];

