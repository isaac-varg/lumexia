'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const updateItemFileType = async (id: string, data: Prisma.ItemFileTypeUncheckedUpdateInput) => {
  return await prisma.itemFileType.update({
    where: {
      id,
    },
    data,
  });
}
