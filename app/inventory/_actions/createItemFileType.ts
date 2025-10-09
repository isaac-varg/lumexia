'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createItemFileType = async (data: Prisma.ItemFileTypeUncheckedCreateInput) => {
  return await prisma.itemFileType.create({
    data,
  })
}
