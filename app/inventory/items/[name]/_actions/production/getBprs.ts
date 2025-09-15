'use server'

import prisma from '@/lib/prisma'

export const getBprs = async (itemId: string) => {
  const batchProductionRecords = await prisma.batchProductionRecord.findMany({
    where: {
      mbpr: {
        producesItemId: itemId,
      },
    },
    include: {
      status: true,
      batchSize: true,
      mbpr: true,
    },
    orderBy: {
      referenceCode: 'desc'
    }
  })
  return batchProductionRecords
}

export type ItemBpr = Awaited<ReturnType<typeof getBprs>>[number];
