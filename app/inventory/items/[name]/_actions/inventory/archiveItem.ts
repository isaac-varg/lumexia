'use server'

import { recordStatuses } from "@/configs/staticRecords/recordStatuses"
import prisma from "@/lib/prisma"

export const archiveItem = async (itemId: string) => {

  const response = await prisma.item.update({
    where: {
      id: itemId,
    },
    data: {
      recordStatusId: recordStatuses.archived,
    }
  });

  return response
}
