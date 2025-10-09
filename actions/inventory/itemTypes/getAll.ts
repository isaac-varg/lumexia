"use server"

import prisma from "@/lib/prisma"


export const getAllItemTypes = async () => {
  const types = await prisma.itemType.findMany({
    include: {
      config: true,
    }
  });

  return types
}

export type ItemType = Awaited<ReturnType<typeof getAllItemTypes>>[number]
