"use server"

import prisma from "@/lib/prisma";

export const getActivity = async (entityId: string) => {
  return await prisma.activityLog.findMany({
    where: {
      entityId,
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export type Activity = Awaited<ReturnType<typeof getActivity>>[number];
