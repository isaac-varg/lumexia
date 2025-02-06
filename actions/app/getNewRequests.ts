'use server'

import { staticRecords } from "@/configs/staticRecords"
import prisma from "@/lib/prisma"

export const getNewRequests = async () => {

    const req = await prisma.purchasingRequest.findMany({
        where: {
            statusId: staticRecords.purchasing.requestStatuses.requested,
        },
        include: {
            _count: true
        }  
    })

    return req;

}


