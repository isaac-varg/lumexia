"use server"

import prisma from "@/lib/prisma"
import { pricingExaminationStatuses } from "@/configs/staticRecords/pricingExaminationStatuses"

export const getQueue = async () => {
    const queue = await prisma.pricingExamination.findMany({
        where: {
            statusId: pricingExaminationStatuses.queued,
        },
        include: {
            examinedItem: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return queue
}

export type PricingQueueEntry = Awaited<ReturnType<typeof getQueue>>[number]
