"use server"
import prisma from "@/lib/prisma"

export const getLinkablePos = async (itemId: string) => {


    const linkables = await prisma.purchaseOrderItem.findMany({
        where: {
            itemId,
        },
        include: {
            purchaseOrders: {
                include: {
                    supplier: true
                }
            },
            uom: true,
            purchaseOrderStatus: true
        },
        orderBy: {
            purchaseOrders: {
                referenceCode: 'desc'
            }
        },
        take: 8,
    })

    return linkables
}

type LinkablePos = Awaited<ReturnType<typeof getLinkablePos>>

export type LinkablePo = LinkablePos[number];

