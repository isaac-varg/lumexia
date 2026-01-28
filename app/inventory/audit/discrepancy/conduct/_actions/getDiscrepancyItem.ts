'use server'

import { getOnHandByItem } from "@/actions/inventory/inventory/getOnHandByItem";
import { purchaseOrderStatuses } from "@/configs/staticRecords/purchaseOrderStatuses";
import { recordStatuses } from "@/configs/staticRecords/recordStatuses";
import prisma from "@/lib/prisma"

export const getDisrepancyItem = async (itemId: string) => {

  const item = await prisma.discrepancyAuditItem.findFirstOrThrow({
    where: {
      itemId,
      item: {
        recordStatusId: {
          not: recordStatuses.archived
        }
      }
    },
    include: {
      notes: {
        include: {
          noteType: true,
          user: true,
        }
      },
      item: true,
      status: true,
      discrepancyAuditItemTransaction: {
        include: {
          transaction: {
            include: {
              user: true
            }
          },

        },
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  });

  const inventory = await getOnHandByItem(item.itemId);
  const lastInventoryAudit = inventory.lastAudited;
  const lastDiscrepancyAudit = item.discrepancyAuditItemTransaction.length > 0 ? item.discrepancyAuditItemTransaction[0] : null;

  const lastPo = await prisma.purchaseOrderItem.findFirst({
    where: {
      itemId: item.item.id,
      purchaseOrderStatusId: purchaseOrderStatuses.received,
    },
    include: {
      purchaseOrders: true,

    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return {
    ...item,
    lots: inventory.lots,
    lastPo,
    lastInventoryAudit,
    lastDiscrepancyAudit,
  }

}


export type DiscrepancyItem = Awaited<ReturnType<typeof getDisrepancyItem>>
