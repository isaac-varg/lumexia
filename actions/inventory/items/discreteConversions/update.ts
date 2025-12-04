"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const updateDiscreteConversion = async (id: string, data: Prisma.DiscreteUnitOfMeasurementConversionUncheckedUpdateInput) => {

  const res = await prisma.discreteUnitOfMeasurementConversion.update({
    where: { id, },
    data,
  });

  return res;
}
