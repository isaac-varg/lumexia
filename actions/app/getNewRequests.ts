'use server'

import { requestStatuses } from "@/configs/staticRecords/requestStatuses"
import prisma from "@/lib/prisma"

export const getNewRequests = async () => {

  const req = await prisma.purchasingRequest.findMany({
    where: {
      statusId: requestStatuses.requested,
    },
    include: {
      _count: true
    }
  })

  return req;

}


