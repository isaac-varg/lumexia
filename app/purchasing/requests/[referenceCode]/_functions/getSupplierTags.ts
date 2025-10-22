'use server'

import prisma from "@/lib/prisma"

export const getSupplierTags = async (requestId: string) => {
  const tags = await prisma.purchasingRequestSupplierTag.findMany({
    where: {
      purchasingRequestId: requestId,
    },
    include: {
      supplier: true
    },
  });

  return tags;
}

export type SupplierTag = Awaited<ReturnType<typeof getSupplierTags>>[number];
