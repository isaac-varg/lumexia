'use server'

import { recordStatuses } from "@/configs/staticRecords/recordStatuses";
import prisma from "@/lib/prisma"

export const getOneItem = async (id: string) => {
  return await prisma.item.findUniqueOrThrow({
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
};

export type Item = Awaited<ReturnType<typeof getOneItem>>;


// kept old type for systems that still use it
export type SingleItem = Awaited<ReturnType<typeof getOneItem>>
