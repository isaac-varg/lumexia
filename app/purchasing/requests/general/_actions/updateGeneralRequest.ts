"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"



export const updateGeneralRequest = async (requestId: string, data: Prisma.GeneralRequestUncheckedUpdateInput) => {

  const res = await prisma.generalRequest.update({
    where: {
      id: requestId,
    },
    data,
  });

  return res

}
