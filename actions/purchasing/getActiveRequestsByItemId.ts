'use server'

import { staticRecords } from "@/configs/staticRecords"
import prisma from "@/lib/prisma"

export const getActiveRequestsByItemId = async (itemId: string) => {

    const requests = await prisma.purchasingRequest.findMany({
        where: {
            itemId,
            OR: [
                {
                    statusId: {
                        not: staticRecords.purchasing.requestStatuses.delivered,
                    }
                },
                {
                    statusId: {
                        not: staticRecords.purchasing.requestStatuses.requestCancelledDuplicateRequest,
                    }
                }
            ],
        },
        include: {
            _count: true,
        }

    })

    return requests
}
