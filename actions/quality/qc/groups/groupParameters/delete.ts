'use server'

import prisma from "@/lib/prisma"

export const deleteGroupParameter = async (id: string) => {
  const response = await prisma.qcGroupParameter.delete({
    where: {
      id
    }
  });

  return response;
}
