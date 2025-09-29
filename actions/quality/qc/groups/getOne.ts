'use server'

import prisma from "@/lib/prisma"

export const getOneQcGroup = async (id: string) => {
  const group = await prisma.qcParameterGroup.findUniqueOrThrow({
    where: { id },
    include: {
      parameters: {
        include: {
          parameter: true
        }
      }
    }
  });

  return group
}
