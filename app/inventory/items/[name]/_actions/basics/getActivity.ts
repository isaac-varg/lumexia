'use server'

import prisma from "@/lib/prisma"

export const getItemActivity = async (itemId: string) => {

  const activity = await prisma.activityLog.findMany({
    where: {
      entityId: itemId,
    },
    include: {
      user: true
    },
    orderBy: {
      createdAt: 'desc',
    }
  });

  return activity;
}

export type ItemActivity = Awaited<ReturnType<typeof getItemActivity>>[number]
