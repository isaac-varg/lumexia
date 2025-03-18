"use server"

import prisma from "@/lib/prisma"

export const getAllMbprs = async () => {

    const mbprs = await prisma.masterBatchProductionRecord.findMany({
        include: {
            producesItem: true,
            recordStatus: true,
        },
        orderBy: {
            updatedAt: "desc"
        }
    });

    return mbprs;
}

export type Mbpr = Awaited<ReturnType<typeof getAllMbprs>>[number]
