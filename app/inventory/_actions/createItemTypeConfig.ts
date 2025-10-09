"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createItemTypeConfig = async (data: Prisma.ItemTypeConfigUncheckedCreateInput) => {
  const response = await prisma.itemTypeConfig.create({
    data,
  });

  return response
}
