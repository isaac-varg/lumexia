"use server"

import { staticRecords } from "@/configs/staticRecords"
import prisma from "@/lib/prisma"

export const getAuditRequests = async () => {
    const requests = await prisma.auditRequest.findMany({
        where: {
           NOT: {
               statusId: staticRecords.inventory.auditRequests.statuses.completed,
           } 
        },
        include: {
            item: true,
            requestedBy: true,
            notes: {
                include: {
                    noteType: true,
                    user: true
                }
            }
        }
    })

    return requests
}

export type AuditRequest = Awaited<ReturnType<typeof getAuditRequests>>[number]
