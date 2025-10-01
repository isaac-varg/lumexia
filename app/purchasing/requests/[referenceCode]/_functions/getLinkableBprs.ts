"use server"

import { staticRecords } from "@/configs/staticRecords"
import { bprStatuses } from "@/configs/staticRecords/bprStatuses"
import prisma from "@/lib/prisma"

export const getLinkableBprs = async (itemId: string) => {

  const linkables = await prisma.bprBillOfMaterials.findMany({
    where: {
      bom: {
        itemId,
      },
      bpr: {
        OR: [
          { bprStatusId: bprStatuses.draft },
          { bprStatusId: bprStatuses.allocatingMaterials },
          { bprStatusId: bprStatuses.awaitingMaterials },
          { bprStatusId: bprStatuses.verifyingBomFulfillment },
          { bprStatusId: bprStatuses.knownMaterialArrival },
        ]
      }
    },
    include: {
      bpr: {
        include: {
          mbpr: {
            include: {
              producesItem: true
            }
          },
          status: true,
          batchSize: true
        }
      },
      bom: true,
    },
    orderBy: {
      bpr: {
        referenceCode: 'desc'
      }
    },
    take: 8
  })

  return linkables
}

export type LinkableBatches = Awaited<ReturnType<typeof getLinkableBprs>>

export type LinkableBatchesEntry = LinkableBatches[number];

