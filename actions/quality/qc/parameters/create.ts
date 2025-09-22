'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createQcParameter = async (data: Prisma.QcParameterUncheckedCreateInput) => {
  const response = await prisma.qcParameter.create({
    data,
    select: {
      name: true,
      id: true,
    }

  });

  return response
}
