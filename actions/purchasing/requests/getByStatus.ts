"use server"

import { staticRecords } from "@/configs/staticRecords"
import prisma from "@/lib/prisma";

const statuses = staticRecords.purchasing.requestStatuses;

export const getRequestsByStatus = async (status: keyof typeof statuses) => {

    const requests = await prisma.purchasingRequest.findMany({
        where: {
            statusId: statuses[status],
        },
        include: {
            item: true,
            status: true,
            priority: true,
            requestingUser: true
        },
        orderBy: {
            updatedAt: 'desc'
        }
    });

    return requests;
}

export type PurchasingRequest = Awaited<ReturnType<typeof getRequestsByStatus>>[number]
