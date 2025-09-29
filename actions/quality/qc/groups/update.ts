"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const updateQcGroup = async (id: string, data: Prisma.QcParameterGroupUncheckedUpdateInput) => {
  const response = await prisma.qcParameterGroup.update({
    where: {
      id,
    },
    data,
  });

  return response;
}
