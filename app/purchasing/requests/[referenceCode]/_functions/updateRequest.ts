"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const updateRequest = async (requestId: string, data: Prisma.PurchasingRequestUncheckedUpdateInput) => {
  const response = await prisma.purchasingRequest.update({
    where: {
      id: requestId
    },
    data,
  })

  return response
};
