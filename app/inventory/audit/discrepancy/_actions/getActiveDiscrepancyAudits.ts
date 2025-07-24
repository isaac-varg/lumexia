"use server"

import { staticRecords } from "@/configs/staticRecords"
import prisma from "@/lib/prisma"

export const getActiveDiscrepancyAudits = async () => {
    const audits = await prisma.discrepancyAudit.findMany({
        where: {
            statusId: staticRecords.inventory.discrepancyAudits.statuses.open,
        },
        include: {
            itemType: true,
            _count: {
                select: {
                    items: true,
                }
            }
        },
    });

    return audits
};

export type ActiveDiscrepancyAudit = Awaited<ReturnType<typeof getActiveDiscrepancyAudits>>[number]
