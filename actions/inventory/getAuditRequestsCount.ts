'use server'

import { staticRecords } from "@/configs/staticRecords";
import prisma from "@/lib/prisma"

export const getAuditRequestCount = async () => {

    const incompleteRequestCount = await prisma.auditRequest.count({
        where: {
            NOT: {
                statusId: staticRecords.inventory.auditRequests.statuses.completed,
            },
        },
    });

    return incompleteRequestCount;
}
