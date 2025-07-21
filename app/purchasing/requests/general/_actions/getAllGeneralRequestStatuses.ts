'use server'

import prisma from "@/lib/prisma"

export const getAllGeneralRequestStatuses = async () => {
    const statuses = await prisma.generalRequestStatus.findMany();

    return statuses;
}

export type GeneralRequestStatus = Awaited<ReturnType<typeof getAllGeneralRequestStatuses>>[number]
