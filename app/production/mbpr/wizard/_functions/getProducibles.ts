"use server"

import { procurementTypes } from "@/configs/staticRecords/procurementTypes"
import prisma from "@/lib/prisma"

export const getProducibles = async () => {
  const items = await prisma.item.findMany({
    where: {
      procurementTypeId: procurementTypes.produced
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
