import { staticRecords } from "@/configs/staticRecords"
import prisma from "@/lib/prisma"

export const getAllCompoundables = async () => {
  const bprs = await prisma.batchProductionRecord.findMany({
    where: {
      OR: [
        {
          bprStatusId: staticRecords.production.bprStatuses.queued
        },
        {
          bprStatusId: staticRecords.production.bprStatuses.inProgress
        }
      ]
    },
    include: {
      status: true,
      batchSize: true,
      mbpr: {
        include: {
          producesItem: true,
        }
      }

    }
  })

  return bprs;
}
