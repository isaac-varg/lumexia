'use server'

import { procurementTypes } from "@/configs/staticRecords/procurementTypes";
import { recordStatuses } from "@/configs/staticRecords/recordStatuses";
import prisma from "@/lib/prisma"

export const getItems = async () => {

  const items = prisma.item.findMany({
    where: {
      procurementTypeId: procurementTypes.purchased,
      recordStatusId: {
        not: recordStatuses.archived
      }
    }
  });

  return items
}

export type Item = Awaited<ReturnType<typeof getItems>>[number]
