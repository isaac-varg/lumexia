'use server'

import prisma from "@/lib/prisma"

export const getOneQcParameter = async (id: string) => {
  const parameter = await prisma.qcParameter.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      inputDefinitions: true,
    }
  });

  return parameter
}
