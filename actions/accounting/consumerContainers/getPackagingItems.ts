"use server"

import { itemTypes } from "@/configs/staticRecords/itemTypes";
import { recordStatuses } from "@/configs/staticRecords/recordStatuses";
import prisma from "@/lib/prisma"


export const getPackagingItems = async () => {

  const items = await prisma.item.findMany({
    where: {
      itemTypeId: itemTypes.packaging,
      recordStatusId: {
        not: recordStatuses.archived
      }
    },
    include: {
      aliases: true
    }
  });

  const transformedItems = items.map((item) => {

    const mergedAliases = item.aliases?.map((alias) => alias.name).join(", ")

    return {
      ...item,
      mergedAliases
    }
  })

  return transformedItems


}

export type PackagingItem = Awaited<ReturnType<typeof getPackagingItems>>[number]
