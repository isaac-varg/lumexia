"use server"

import { getLotsByItem } from "@/actions/auxiliary/getLotsByItem"
import { staticRecords } from "@/configs/staticRecords";
import prisma from "@/lib/prisma";

// current inventory (now)

export const getInventory = async (itemId: string) => {


    const lots = await getLotsByItem(itemId);
    const { queued, stagingMaterials, compounding, completed, awaitingMaterials, draft, allocatedMaterials, verifyingBomFulfillment } = staticRecords.production.bprStatuses;


    const item = await prisma.item.findFirst({
        where: {
            id: itemId,
        },
    });

    // this is the amount neded for batches that do not yet have everything allocated
    const needed = await prisma.bprBillOfMaterials.findMany({
        where: {
            bom: {
                itemId,
            },
            bpr: {
                OR: [
                    { bprStatusId: draft },
                    { bprStatusId: allocatedMaterials },
                    { bprStatusId: verifyingBomFulfillment },
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

    const totalQuantityNeeded = needed.reduce((accumulator: number , current: typeof needed[number]) => accumulator + current.quantity, 0)

    return {
        ...item,
        totalQuantityOnHand: totalOnHand,
        allocated,
        needed,
        totalQuantityAllocated,
        totalQuantityAvailable,
        purchases,
        totalQuantityNeeded,
    }
}

export type ItemInventory = Awaited<ReturnType<typeof getInventory>>












