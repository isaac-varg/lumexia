'use server'

import prisma from "@/lib/prisma"

export const getProductionBpr = async (bprId: string) => {
  const bpr = await prisma.batchProductionRecord.findFirstOrThrow({
    where: {
      id: bprId
    },
    include: {
      status: true,
      mbpr: {
        include: {
          producesItem: true
        }
      },
      lotOrigin: {
        include: {
          lot: true
        }
      }
    }
  });

  return bpr
};

export type ProductionBpr = Awaited<ReturnType<typeof getProductionBpr>>
