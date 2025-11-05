"use server"

import { recordStatuses } from "@/configs/staticRecords/recordStatuses";
import prisma from "@/lib/prisma"

export const getOneItem = async (id: string) => {
  const item = await prisma.item.findFirstOrThrow({
    where: {
      id,
      recordStatusId: {
        not: recordStatuses.archived
      }
    },
    include: {
      itemType: true,
      procurementType: true,
      inventoryType: true,
      inventoryUom: true

    }
  })

  return item
}

export type SingleItem = Awaited<ReturnType<typeof getOneItem>>
