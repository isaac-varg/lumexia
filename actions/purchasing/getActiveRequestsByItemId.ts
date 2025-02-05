'use server'

import { staticRecords } from "@/configs/staticRecords"
import prisma from "@/lib/prisma"

export const getActiveRequestsByItemId = async (itemId: string) => {

    const requests = await prisma.purchasingRequest.findMany({
        where: {
            itemId,
            statusId: {
                not: staticRecords.purchasing.requestStatuses.delivered,
            }
        },
        include: {
            _count: true,
        }

    })

    return requests
}
