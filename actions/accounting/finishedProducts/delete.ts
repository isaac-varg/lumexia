'use server'

import { staticRecords } from "@/configs/staticRecords"
import { recordStatuses } from "@/configs/staticRecords/recordStatuses"
import prisma from "@/lib/prisma"

// does not actually delete but hides it via record status

export const deleteFinishedProduct = async (id: string) => {

  const response = await prisma.finishedProduct.update({
    where: {
      id,
    },
    data: {
      recordStatusId: recordStatuses.archived,
    }
  })

  return response;
}

