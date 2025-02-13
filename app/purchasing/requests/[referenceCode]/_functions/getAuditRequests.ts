"use server"

import prisma from "@/lib/prisma"


export const getAuditRequests = async (itemId: string) => {
    
    const reqs = await prisma.auditRequest.findMany({
        where: {
            itemId,
        },
        include: {
            inventoryAudit: {
                include: {
                    user: true
                }
            },
            status: true,
        },
        orderBy: {
           updatedAt: 'desc' 
        },
        take: 3
    })

    return reqs;

}


export type LastAuditRequest = Awaited<ReturnType<typeof getAuditRequests>>[number]
