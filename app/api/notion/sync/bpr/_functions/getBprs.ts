"use server"

import { bprStatuses } from "@/configs/staticRecords/bprStatuses";
import prisma from "@/lib/prisma"

export const getBprs = async () => {
  const bprs = await prisma.batchProductionRecord.findMany({
    where: {
      bprStatusId: {
        not: bprStatuses.released,
      }
    }
  });

  return bprs
}
