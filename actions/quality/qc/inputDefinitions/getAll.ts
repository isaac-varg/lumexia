'use server'

import prisma from "@/lib/prisma"

export const getAllInputDefinitions = async (parameterId: string) => {
  const definitions = await prisma.qcParameterInputDefinition.findMany({
    where: {
      parameterId,
    },
    include: {
      dataType: true
    }
  });

  return definitions;
}

export type ParameterInputDefinition = Awaited<ReturnType<typeof getAllInputDefinitions>>[number]

