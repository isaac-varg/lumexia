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
      purchaseOrderStatus: true,
      uom: true,
    },
    orderBy: {
      createdAt: 'desc',
    }
  });

  const transformed = poItems.map(item => {

    const lineTotal = item.pricePerUnit * item.quantity;

    return {
      referenceCode: item.purchaseOrders.referenceCode,
      supplierName: item.purchaseOrders.supplier.name,
      statusName: item.purchaseOrderStatus.name,
      lineTotal,
      ...item,
    }
  })


  return transformed;
}

export type DashboardItemPurchaseOrder = Awaited<ReturnType<typeof getItemPurchaseOrders>>[number];
