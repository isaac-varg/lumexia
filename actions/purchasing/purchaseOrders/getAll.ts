'use server'

import prisma from "@/lib/prisma"

export const getAllPurchaseOrders = async () => {
  return await prisma.purchaseOrder.findMany({
    include: {
      supplier: true,
      status: true,
    }
  });
};


export type PurchaseOrderAll = Awaited<ReturnType<typeof getAllPurchaseOrders>>[number];

