"use server"

import { staticRecords } from "@/configs/staticRecords"
import prisma from "@/lib/prisma"

const { delivered, requestCancelledDuplicateRequest, discontinuedIngredient } = staticRecords.purchasing.requestStatuses

export const getPurchasingRequestsForPlanning = async (itemId: string) => {


    const response = await prisma.purchasingRequest.findMany({
        where: {
            itemId,
            statusId: {
                notIn: [delivered, requestCancelledDuplicateRequest, discontinuedIngredient]
            }
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

export type PurchasingRequestForPlanning = Awaited<ReturnType<typeof getPurchasingRequestsForPlanning>>[number]
