'use server'

import prisma from "@/lib/prisma"

export const getAllPurchaseOrderItems = async (purchaseOrderId: string) => {


  const items = await prisma.purchaseOrderItem.findMany({
    where: {
      purchaseOrderId,
    },
    include: {
      item: {
        include: {
          itemType: {
            include: {
              config: true
            }
          },
        },
      },
      uom: true,
      purchaseOrders: true,
      purchaseOrderStatus: true
    }
  });


  return items;

}

export type PurchaseOrderItem = Awaited<ReturnType<typeof getAllPurchaseOrderItems>>[number];
