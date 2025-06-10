"use server"

import prisma from "@/lib/prisma"

export const getAllQcRecordStatuses = async () => {
    const statuses = await prisma.qcRecordStatus.findMany({
        orderBy: {
            sequence: 'asc',
        }
    });

    return statuses
}

export type QcRecordStatus = Awaited<ReturnType<typeof getAllQcRecordStatuses>>[number]
