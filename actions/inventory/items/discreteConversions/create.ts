'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createDiscreteConversion = async (data: Prisma.DiscreteUnitOfMeasurementConversionUncheckedCreateInput) => {
  const res = await prisma.discreteUnitOfMeasurementConversion.create({ data, });

  return res;
}
