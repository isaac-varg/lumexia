'use server'

import { auditRequestStatuses } from "@/configs/staticRecords/auditRequestStatuses";
import prisma from "@/lib/prisma"

export const getAuditRequestCount = async () => {

  const incompleteRequestCount = await prisma.auditRequest.count({
    where: {
      statusId: auditRequestStatuses.open,
    },
  });

  return incompleteRequestCount;
}
