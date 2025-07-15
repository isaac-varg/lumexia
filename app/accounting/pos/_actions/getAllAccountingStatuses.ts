'use server'

import prisma from "@/lib/prisma"


export const getAllPoAccountingStatuses = async () => {
    const statuses = await prisma.poAccountingStatus.findMany();
    return statuses
}

export type PoAccountingStatus = Awaited<ReturnType<typeof getAllPoAccountingStatuses>>[number];
