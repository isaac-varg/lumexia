'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createInputDefinitions = async (data: Prisma.QcParameterInputDefinitionUncheckedCreateInput) => {
  const response = await prisma.qcParameterInputDefinition.create({
    data,
  });

  return response;
}
