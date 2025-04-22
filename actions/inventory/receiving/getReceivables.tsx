'use server'

import { staticRecords } from "@/configs/staticRecords"
import prisma from "@/lib/prisma"

export const getReceivables = async () => {

    const pos = await prisma.purchaseOrder.findMany({
        where: {
            OR: [
                { statusId: staticRecords.purchasing.poStatuses.partiallyReceived },
                { statusId: staticRecords.purchasing.poStatuses.confirmedSlashAwaitingDelivery },
            ]
        },
        include: {
            status: true,
            supplier: true,
        }
    });
    return pos
};

export type Receivables = Awaited<ReturnType<typeof getReceivables>>[number]
