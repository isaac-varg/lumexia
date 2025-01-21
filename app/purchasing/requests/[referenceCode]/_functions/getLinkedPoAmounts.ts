"use server"

import prisma from "@/lib/prisma"

export const getLinkedPosAmount = async (poIds: string[], itemId: string) => {

    const pos = poIds.map(async (id) => {

        const po = await prisma.purchaseOrderItem.findMany({
            where: {
                itemId,
                purchaseOrderId: id,
            }
        });

        // incase of split or multiple of the same in the po
        const total = po.reduce((accumulator: number, current: any) => accumulator + current.quantity, 0)

        return  {
            poItems: po,
            total,
        }
    })

    const purchases = await Promise.all(pos)

    type Purchases = typeof purchases[number]

    const totalPurchased = purchases.reduce((accumulator: number, current: Purchases ) => accumulator + current.total, 0)

    return  {
        purchases,
        totalPurchased,
    }
}

export type LinkedPoAmounts = Awaited<ReturnType<typeof getLinkedPosAmount>>;
