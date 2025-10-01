'use server'

import { requestStatuses } from "@/configs/staticRecords/requestStatuses";
import prisma from "@/lib/prisma"

const { delivered, requestCancelledDuplicateRequest, discontinuedIngredient } = requestStatuses;

export const getActiveRequestsByItemId = async (itemId: string) => {

  const requests = await prisma.purchasingRequest.findMany({
    where: {
      itemId,
      statusId: {
        notIn: [
          delivered,
          requestCancelledDuplicateRequest,
          discontinuedIngredient
        ]
      }
    },
    include: {
      _count: true,
    }

  })

  return requests
}
