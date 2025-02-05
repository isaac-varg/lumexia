'use server'

import { staticRecords } from "@/configs/staticRecords"
import prisma from "@/lib/prisma"

export const getItems = async () => {

    const items = prisma.item.findMany({
        where: {
            procurementTypeId: staticRecords.inventory.procurementTypes.purchased,
        }
    });

    return items
}

export type Item = Awaited<ReturnType<typeof getItems>>[number]
