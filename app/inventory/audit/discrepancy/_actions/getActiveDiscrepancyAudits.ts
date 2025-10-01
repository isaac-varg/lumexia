"use server"

import { discrepancyAuditStatuses } from "@/configs/staticRecords/discrepancyAuditStatuses";
import prisma from "@/lib/prisma"

export const getActiveDiscrepancyAudits = async () => {
  const audits = await prisma.discrepancyAudit.findMany({
    where: {
      statusId: discrepancyAuditStatuses.open,
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
