'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createQcRecordFile = async (data: Prisma.QcRecordFileUncheckedCreateInput) => {
  const res = await prisma.qcRecordFile.create({
    data,
  });

  return res;
}
