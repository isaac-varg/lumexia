"use server"

import { recordStatuses } from "@/configs/staticRecords/recordStatuses"
import prisma from "@/lib/prisma"

export const getOneMbpr = async (id: string) => {

  const mbpr = await prisma.masterBatchProductionRecord.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      producesItem: true,
      BillOfMaterial: {
        include: {
          item: true,
          step: true,
        }
      },
      BatchSize: {
        include: {
          recordStatus: true
        }
      },
      recordStatus: true,
    }
  })

  const activeBatchSize = mbpr.BatchSize.filter((bs) => bs.recordStatusId === recordStatuses.active)[0];


  const transformedBOM = mbpr.BillOfMaterial.map((item) => {
    return {
      ...item,
      amount: (item.concentration / 100) * activeBatchSize.quantity,
    }
  });

  const transformedMbpr = {
    ...mbpr,
    bom: transformedBOM
  }

  return transformedMbpr
}

export type Mbpr = Awaited<ReturnType<typeof getOneMbpr>>

export type MbprBom = Mbpr['bom'][number]
