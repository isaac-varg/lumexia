'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const updateQcRecord = async (id: string, data: Prisma.QcRecordUncheckedUpdateInput) => {

  const res = await prisma.qcRecord.update({
    where: {
      id,
    },
    data,
  });

  return res;
}


