"use server"

import { recordStatuses } from "@/configs/staticRecords/recordStatuses"
import prisma from "@/lib/prisma"

export const getAllItems = async () => {

  const items = await prisma.item.findMany({
    where: {
      recordStatusId: {
        not: recordStatuses.archived
      }
    },
    include: {
      aliases: true
    }
  })

  const transformedItems = items.map((item) => {
    const flattenAliases = item.aliases?.map((alias) => alias.name).join(", ");

    return {
      ...item,
      aliasesAll: flattenAliases,
    };
  });


  return transformedItems;
}

export type PurchasableItem = Awaited<ReturnType<typeof getAllItems>>[number]

