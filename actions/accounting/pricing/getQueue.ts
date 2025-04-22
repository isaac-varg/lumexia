"use server"

import prisma from "@/lib/prisma"

export const getQueue = async () => {
    const queue = await prisma.pricingQueue.findMany({
        where: {
            isCompleted: false,
        },
        include: {
            item: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return queue
}

export type PricingQueueEntry = Awaited<ReturnType<typeof getQueue>>[number]
