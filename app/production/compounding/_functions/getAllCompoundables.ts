import { bprStatuses } from "@/configs/staticRecords/bprStatuses";
import prisma from "@/lib/prisma"

export const getAllCompoundables = async () => {
  const bprs = await prisma.batchProductionRecord.findMany({
    where: {
      OR: [
        {
          bprStatusId: bprStatuses.queued
        },
        {
          bprStatusId: bprStatuses.compounding
        },
        {
          bprStatusId: bprStatuses.stagingMaterials
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
      },
      lotOrigin: {
        include: {
          lot: true,
        }
      }

    }
  })

  return bprs;
}
