'use server'

import { auditRequestStatuses } from "@/configs/staticRecords/auditRequestStatuses";
import prisma from "@/lib/prisma"


export const getAllCompletedAuditRequests = async (amount: number = 20) => {
  const audits = await prisma.auditRequest.findMany({
    where: {
      statusId: auditRequestStatuses.completed,
    },
    include: {
      requestedBy: true,
      inventoryAudit: {
        include: {
          user: true
        }
      },
      notes: {
        include: {
          user: true
        }
      },
      item: true
    },
    take: amount,
    orderBy: {
      updatedAt: 'desc'
    }
  })

  return audits;
}

export type CompletedAudit = Awaited<ReturnType<typeof getAllCompletedAuditRequests>>[number]
