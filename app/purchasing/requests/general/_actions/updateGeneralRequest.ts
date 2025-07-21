"use server"

import { staticRecords } from "@/configs/staticRecords"
import prisma from "@/lib/prisma"


const { requested } = staticRecords.purchasing.generalRequests.statuses

export const updateGeneralRequest = async (requestId: string, title: string) => {

    const res = await prisma.generalRequest.update({
        where: {
            id: requestId,
        },
        data: {
            title,
            statusId: requested,
        }
    });

    return res

}
