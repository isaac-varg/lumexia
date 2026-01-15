'use server'

import prisma from "@/lib/prisma"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";
import { Prisma } from "@prisma/client"

export const updateFinishedProductData = async (id: string, data: Prisma.FinishedProductUncheckedUpdateInput) => {

  const response = await prisma.finishedProduct.update({
    where: {
      id,
    },
    data,
  });


  return response;
}
