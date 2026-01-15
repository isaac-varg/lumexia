'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const updateAuxiliary = async (id: string, data: Prisma.FinishedProductAuxiliaryUncheckedUpdateInput) => {
  return await prisma.finishedProductAuxiliary.update({
    where: {
      id,
    },
    data,
  });
} 
