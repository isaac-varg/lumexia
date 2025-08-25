'use server'

import prisma from "@/lib/prisma"


export const getItemPurchaseOrders = async (itemId: string) => {

  const poItems = await prisma.purchaseOrderItem.findMany({
    where: {
      itemId,
    },
    include: {
      purchaseOrders: {
        include: {
          supplier: true,
          status: true,
        }
      },
      uom: true,
    },
    orderBy: {
      createdAt: 'desc',
    }
  });


  return poItems
}

export type DashboardItemPurchaseOrder = Awaited<ReturnType<typeof getItemPurchaseOrders>>[number];
