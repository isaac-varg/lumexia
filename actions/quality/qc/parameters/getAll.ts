'use server'

import prisma from "@/lib/prisma"

export const getAllQcParameters = async (filter?: 'wet') => {
  const parameters = await prisma.qcParameter.findMany({
    ...(filter === 'wet' && { where: { isWetParameter: true } }),
  });

  return parameters;
}

export type QcParameter = Awaited<ReturnType<typeof getAllQcParameters>>[number]
