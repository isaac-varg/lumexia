"use server"

import prisma from "@/lib/prisma"

export const getRequestStatuses = async () => {
    const statuses = await prisma.requestStatus.findMany({
        orderBy: {
            sequence: 'asc',
        }
    });

    return statuses;
}

export type RequestStatus = Awaited<ReturnType<typeof getRequestStatuses>>[number];
