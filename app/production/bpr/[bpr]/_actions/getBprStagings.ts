'use server'

import prisma from "@/lib/prisma"

export const getBprStagings = async (bprBomId: string) => {
  const stagings = await prisma.bprStaging.findMany({
    where: {
      bprBomId,
    },
    include: {
      lot: true,
      pulledByUser: true,
      uom: true,
      status: true,
    },
    orderBy: {
      createdAt: 'desc',
    }
  });

  return stagings;
};

export type BprStagingItem = Awaited<ReturnType<typeof getBprStagings>>[number]
