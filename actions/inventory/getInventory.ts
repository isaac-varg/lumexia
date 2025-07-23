"use server"

import prisma from "@/lib/prisma"
import { getLotsByItem } from "../auxiliary/getLotsByItem"
import { staticRecords } from "@/configs/staticRecords";


export const getInventory = async (itemId: string) => {

    const item = await prisma.item.findUnique({ where: { id: itemId } })
    const lots = await getLotsByItem(itemId);
    const { queued, stagingMaterials, compounding, completed, awaitingMaterials } = staticRecords.production.bprStatuses;

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
        purchases,
        totalQuantityOnHand: totalOnHand,
        allocated,
        totalQuantityAllocated,
        totalQuantityAvailable,
    }

}

export type Inventory = Awaited<ReturnType<typeof getInventory>>

