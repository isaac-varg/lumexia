'use server'

import prisma from "@/lib/prisma"

export const getOneQcTemplate = async (id: string) => {
  const template = await prisma.qcTemplate.findUniqueOrThrow({
    where: { id },
    include: {
      parameters: {
        include: {
          parameter: true
        }
      }
    }
  });

  return template
}

