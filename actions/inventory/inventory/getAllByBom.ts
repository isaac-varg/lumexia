"use server"

import { getLotsByItem } from "@/actions/auxiliary/getLotsByItem"
import prisma from "@/lib/prisma"
import { BprBomItem } from "@/actions/production/bprs/boms/getByBpr"
import { bprStatuses } from "@/configs/staticRecords/bprStatuses"




export const getAllInventoryByBom = async (bom: BprBomItem[]) => {
  const data = await Promise.all(bom.map(async (material: BprBomItem) => {
    const lots = await getLotsByItem(material.bom.itemId)
    const { queued, stagingMaterials, compounding, completed, awaitingMaterials } = bprStatuses;

    const allocated = await prisma.bprBillOfMaterials.findMany({
      where: {
        bom: {
          itemId: material.bom.item.id,
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
        itemId: material.bom.item.id,
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
      ...material,
      totalQuantityOnHand: totalOnHand,
      allocated,
      totalQuantityAllocated,
      totalQuantityAvailable,
      purchases,
    }
  }))

  return data
}

export type BprBomItemInventory = Awaited<ReturnType<typeof getAllInventoryByBom>>[number];

