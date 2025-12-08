'use server'

import prisma from "@/lib/prisma"


export const getBprStagings = async (bprId: string) => {
  const stagings = await prisma.bprStaging.findMany({
    where: {
      bprBom: {
        bprId,
      }
    },
    include: {
      bprBom: {
        include: {
          bpr: true
        }
      },
      lot: true,
      pulledByUser: true,
      uom: true,
      status: true,
    }
  })

  return stagings
}

export type BprStaging = Awaited<ReturnType<typeof getBprStagings>>[number];
