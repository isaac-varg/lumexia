'use server'

import prisma from "@/lib/prisma"

export const getAllQcRecordFileTypes = async () => {
  const types = await prisma.qcRecordFileType.findMany();
  return types
}

export type QcRecordFileType = Awaited<ReturnType<typeof getAllQcRecordFileTypes>>[number];
