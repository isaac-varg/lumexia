"use server"

import prisma from "@/lib/prisma"

export const getMbprActivity = async (mbprId: string) => {
  const activity = await prisma.activityLog.findMany({
    where: {
      entityId: mbprId,
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

export type MbprActivity = Awaited<ReturnType<typeof getMbprActivity>>[number]
