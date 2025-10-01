'use server'

import { generalRequestStatuses } from "@/configs/staticRecords/generalRequestStatuses"
import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

const { requested } = generalRequestStatuses;



export const getAllGeneralRequests = async (isAll: boolean) => {

  const where: Prisma.GeneralRequestWhereInput = {}

  if (!isAll) {
    where.statusId = requested
  }

  const requests = await prisma.generalRequest.findMany({
    where,
    include: {
      user: true,
      status: true
    }
  });

  return requests

}


export type GeneralRequestMinimal = Awaited<ReturnType<typeof getAllGeneralRequests>>[number];
