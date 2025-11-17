'use server'

import prisma from "@/lib/prisma"

export const getOnePurchaseOrder = async (id: string) => {
  return await prisma.purchaseOrder.findUnique({
    where: {
      id,
    },
    include: {
      supplier: true,
      status: true,
    }
  });
};

export type PurchaseOrder = Awaited<ReturnType<typeof getOnePurchaseOrder>>;
