"use server"

import prisma from "@/lib/prisma"

export const getActivity = async (bprId: string) => {
  const activity = await prisma.activityLog.findMany({
    where: {
      entityId: bprId,
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  return activity;
}

export type BprActivity = Awaited<ReturnType<typeof getActivity>>[number]
