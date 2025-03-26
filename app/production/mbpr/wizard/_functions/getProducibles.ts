"use server"

import { staticRecords } from "@/configs/staticRecords"
import prisma from "@/lib/prisma"

export const getProducibles = async () => {
    const items = await prisma.item.findMany({
        where: {
            procurementTypeId: staticRecords.inventory.procurementTypes.produced
        },
        include: {
            aliases: true,
        }
    })

    const transformedItems = items.map((item) => {

        const mergedAliases = item.aliases?.map((alias) => alias.name).join(", ")

        return {
            ...item,
            mergedAliases
        }
    })

    return transformedItems
}

export type ProducibleItem = Awaited<ReturnType<typeof getProducibles>>[number]
