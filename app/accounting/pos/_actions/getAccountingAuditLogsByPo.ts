'use server'

import prisma from "@/lib/prisma"

export const getAccountingAuditLogsByPo = async (poId: string) => {
    const logs = await prisma.poAccountingAuditLog.findMany({
        where: {
            poId,
        },
        include: {
            user: true
        }
    });

    return logs;
}

export type AccountingLog = Awaited<ReturnType<typeof getAccountingAuditLogsByPo>>[number]
