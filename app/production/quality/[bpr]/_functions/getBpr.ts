"use server"
import prisma from "@/lib/prisma"

export const getBpr = async (bprId: string) => {

  const bpr = await prisma.batchProductionRecord.findUnique({
    where: {
      id: bprId
    },
    include: {
      mbpr: {
        include: {
          producesItem: true
        }
      },
      status: true,
      batchSize: true,
    }
  })

  return bpr
}
