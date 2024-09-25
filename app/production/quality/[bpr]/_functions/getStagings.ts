"use server"

import prisma from "@/lib/prisma"

export const getStagings = async (bprId: string ) => {

  const stagings = await prisma.bprStaging.findMany({
    where: {
      bprBom: {
       bprId,
      }
    },
    include: {

    }
  })

  return stagings
}
