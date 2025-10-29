"use server"

import prisma from "@/lib/prisma"
import { getLotsByItem } from "../auxiliary/getLotsByItem"
import { bprStatuses } from "@/configs/staticRecords/bprStatuses";
import { recordStatuses } from "@/configs/staticRecords/recordStatuses";


export const getInventory = async (itemId: string) => {

  const item = await prisma.item.findFirst({
    where: {
      id: itemId,
      recordStatusId: {
        not: recordStatuses.archived
      }
    }
  })
  const lots = await getLotsByItem(itemId);
  const { queued, stagingMaterials, compounding, completed, awaitingMaterials } = bprStatuses;

  const allocated = await prisma.bprBillOfMaterials.findMany({
    where: {
      bom: {
        itemId,
      },
      bpr: {
        OR: [
          { bprStatusId: queued },
          { bprStatusId: stagingMaterials },
          { bprStatusId: compounding },
          { bprStatusId: completed },
          { bprStatusId: awaitingMaterials },
        ]
      }
    },
    include: {
      bpr: {
        include: {
          mbpr: {
            include: {
              producesItem: true,
            }
          },
          status: true
        }
      },
      bom: true,
      uom: true,
    }
  })

  const purchases = await prisma.purchaseOrderItem.findMany({
    where: {
      itemId,
    },
    orderBy: {
      purchaseOrders: {
        referenceCode: 'desc',
      },
    },
    include: {
      purchaseOrders: {
        include: {
          status: true
        }
      },
      purchaseOrderStatus: true
    },
    take: 5
  })

  const totalOnHand = lots.reduce(
    (accumulator: number, current: any) => accumulator + current.totalQuantityOnHand, 0
  );

  const totalQuantityAllocated = allocated.reduce((accumulator: number, current: any) => accumulator + current.quantity, 0)

  const totalQuantityAvailable = totalOnHand - totalQuantityAllocated;


  return {
    item,
    lots,
    purchases,
    totalQuantityOnHand: totalOnHand,
    allocated,
    totalQuantityAllocated,
    totalQuantityAvailable,
  }

}

export type Inventory = Awaited<ReturnType<typeof getInventory>>

