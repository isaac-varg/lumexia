'use server'

import prisma from "@/lib/prisma"

export const deleteDiscreteConversion = async (id: string) => {
  const res = await prisma.discreteUnitOfMeasurementConversion.delete({
    where: { id, }
  });

  return res;
};


