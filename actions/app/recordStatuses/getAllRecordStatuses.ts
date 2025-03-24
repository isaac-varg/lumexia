"use server"

import prisma from "@/lib/prisma"

export const getAllRecordStatuses = async () => {
    const statuses = await prisma.recordStatus.findMany();
    return statuses
}

export type RecordStatus = Awaited<ReturnType<typeof getAllRecordStatuses>>[number]

