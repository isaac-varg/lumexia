"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const updateMbpr = async (id: string, data: Prisma.MasterBatchProductionRecordUncheckedUpdateInput) => {
    const response = await prisma.masterBatchProductionRecord.update({
        where: {
            id,
        },
        data,
    })

    return response
};
