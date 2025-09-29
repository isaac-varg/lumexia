"use server"

import prisma from "@/lib/prisma"


export const getAllDataTypes = async () => {
  const types = await prisma.qcDataType.findMany();

  return types;
}

export type QcDataType = Awaited<ReturnType<typeof getAllDataTypes>>[number]
