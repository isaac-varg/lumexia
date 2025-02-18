"use server"

import prisma from "@/lib/prisma"

export const getAllRequests = async () => {
    const requests = await prisma.purchasingRequest.findMany({
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

    return requests
}

export type Requests = Awaited<ReturnType<typeof getAllRequests>>[number];
