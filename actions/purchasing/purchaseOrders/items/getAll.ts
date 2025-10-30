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
      purchaseOrderStatus: true
    }
  });


  return items;

}

export type PurchaseOrerItem = Awaited<ReturnType<typeof getAllPurchaseOrderItems>>[number];
