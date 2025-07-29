'use server'

import prisma from "@/lib/prisma"

export const getDiscrepancyAudit = async (auditId: string) => {
    const audit = await prisma.discrepancyAudit.findFirst({
        where: {
            id: auditId,
        },
        include: {
            itemType: true,
        }
    });


    return audit;
}

export type DiscrepancyAudit = Awaited<ReturnType<typeof getDiscrepancyAudit>>
