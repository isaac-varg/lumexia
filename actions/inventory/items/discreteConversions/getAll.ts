'use server'

import prisma from "@/lib/prisma"


export const getAllDiscreteConversions = async (itemId: string) => {

  const conversions = await prisma.discreteUnitOfMeasurementConversion.findMany({
    where: {
      itemId,
    },
    include: {
      uomA: true,
      uomB: true,
      supplier: true,
    }
  })

  return conversions;
}

export type DiscreteConversion = Awaited<ReturnType<typeof getAllDiscreteConversions>>[number];
