'use server'

import { recordStatuses } from "@/configs/staticRecords/recordStatuses";
import prisma from "@/lib/prisma"

export const getPurchaseOrdersForDashboard = async () => {
  // TODO maybe paginate this so our little server doesnt have to work so hard lol

  const pos = await prisma.purchaseOrder.findMany({
    where: {
      recordStatusId: {
        not: recordStatuses.archived
      },
    },
    include: {
      supplier: true,
      status: true,
      purchaseOrderItems: true,
      poAccountingDetail: {
        include: {
          status: true,
        }
      }
    },
    orderBy: {
      referenceCode: 'desc'
    },
  });

  const transformedPos = pos.map(po => {

    const total = po.purchaseOrderItems.reduce((acc, curr) => (curr.quantity * curr.pricePerUnit) + acc, 0);

    return {
      ...po,
      total,
    }
  })

  return transformedPos;
}

export type DashboardPurchaseOrder = Awaited<ReturnType<typeof getPurchaseOrdersForDashboard>>[number]



