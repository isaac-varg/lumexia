"use server"

import prisma from "@/lib/prisma"



export const getActivity = async (purchaseOrderId: string) => {
  const activity = await prisma.activityLog.findMany({
    where: {
      entityId: purchaseOrderId,
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

export type PurchaseOrderActivity = Awaited<ReturnType<typeof getActivity>>

export type TPurchaseOrderActivity = Awaited<ReturnType<typeof getActivity>>[number]
