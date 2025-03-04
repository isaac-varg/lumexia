"use server"

import prisma from "@/lib/prisma"

export const getLastItemPrice = async (itemId: string) => {

    const price = await prisma.purchaseOrderItem.findFirst({
        where: {
            itemId,
        },
        include: {
            uom: true,
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 1,
    })

    return price
}

export type LastItemPrice = Awaited<ReturnType<typeof getLastItemPrice>>
