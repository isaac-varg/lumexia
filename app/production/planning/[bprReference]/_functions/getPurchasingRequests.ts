"use server"

import prisma from "@/lib/prisma"

export const getPurchasingRequests = async (itemId: string) => {

    const response = await prisma.purchasingRequest.findMany({
        where: {
            itemId,
        },
        include: {
            pos: {
                include: {
                    po: {
                        include: {
                            purchaseOrderItems: {
                                include: {
                                    details: true,
                                }
                            }
                        }
                    }
                }
            }
        }
    })

    return response
}

export type PurchasingRequestForPlanning = Awaited<ReturnType<typeof getPurchasingRequests>>[number]
