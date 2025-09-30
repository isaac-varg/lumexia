"use server"

import { itemTypes } from "@/configs/staticRecords/itemTypes";
import prisma from "@/lib/prisma"


export const getPackagingItems = async () => {

  const items = await prisma.item.findMany({
    where: {
      itemTypeId: itemTypes.packaging,
    }
  });

  return items;
}

export type PackagingItem = Awaited<ReturnType<typeof getPackagingItems>>[number]
