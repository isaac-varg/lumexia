'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const updateBpr2 = async (id: string, data: Prisma.BatchProductionRecordUncheckedUpdateInput) => {

    const response = await prisma.batchProductionRecord.update({
        where: {
            id,
        },
        data,
    })

    return response

}
