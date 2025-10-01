'use server'

import { purchaseOrderStatuses } from "@/configs/staticRecords/purchaseOrderStatuses";
import prisma from "@/lib/prisma"

export const getReceivables = async () => {

  const pos = await prisma.purchaseOrder.findMany({
    where: {
      OR: [
        { statusId: purchaseOrderStatuses.partiallyReceived },
        { statusId: purchaseOrderStatuses.confirmedAwaitingDelivery },
      ]
    },
    include: {
      status: true,
      supplier: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  return pos
};

export type Receivables = Awaited<ReturnType<typeof getReceivables>>[number]
