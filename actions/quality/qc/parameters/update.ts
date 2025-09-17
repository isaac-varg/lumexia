"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const updateQcParameter = async (id: string, data: Prisma.QcParameterUncheckedUpdateInput) => {
  const response = await prisma.qcParameter.update({
    where: {
      id,
    },
    data,
  })

  return response;
}
