'use server'

import prisma from "@/lib/prisma"

export const deleteInputDefinition = async (id: string) => {
  return await prisma.qcParameterInputDefinition.delete({
    where: { id },
  });
}
