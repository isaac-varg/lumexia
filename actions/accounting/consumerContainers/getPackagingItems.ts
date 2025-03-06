"use server"

import { staticRecords } from "@/configs/staticRecords"
import prisma from "@/lib/prisma"


export const getPackagingItems = async () => {

    const items = await prisma.item.findMany({
        where: {
            itemTypeId: staticRecords.inventory.itemTypes.packaging,
        }
    });

    return items;
}

export type PackagingItem = Awaited<ReturnType<typeof getPackagingItems>>[number]
