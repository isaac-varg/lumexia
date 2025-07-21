'use server'

import { staticRecords } from "@/configs/staticRecords"
import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

const { requested } = staticRecords.purchasing.generalRequests.statuses



export const getAllGeneralRequests = async (isAll: boolean) => {

    const where: Prisma.GeneralRequestWhereInput = {}

    if (!isAll) {
        where.statusId = requested
    }

    const requests = await prisma.generalRequest.findMany({
        where,
        include: {
            user: true,
            status: true
        }
    });

    return requests

}


export type GeneralRequestMinimal = Awaited<ReturnType<typeof getAllGeneralRequests>>[number];
