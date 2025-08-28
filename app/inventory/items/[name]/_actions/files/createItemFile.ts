'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createItemFile = async (data: Prisma.ItemFileUncheckedCreateInput) => {
  const res = await prisma.itemFile.create({
    data,
  })
  return res;
};
