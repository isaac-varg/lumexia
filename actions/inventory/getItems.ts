'use server'

import { procurementTypes } from "@/configs/staticRecords/procurementTypes";
import prisma from "@/lib/prisma"

export const getItems = async () => {

  const items = prisma.item.findMany({
    where: {
      procurementTypeId: procurementTypes.purchased,
    }
  });

  return items
}

export type Item = Awaited<ReturnType<typeof getItems>>[number]
