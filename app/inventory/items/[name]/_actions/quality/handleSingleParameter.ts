'use server'

import prisma from "@/lib/prisma"

export const handleSingleParameter = async (itemId: string, parameterId: string) => {
  const res = await prisma.qcItemParameter.create({
    data: {
      itemId,
      parameterId,
    }
  });

  return res;
}
