'use server'
import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const updateInputDefinition = async (id: string, data: Prisma.QcParameterInputDefinitionUncheckedUpdateInput) => {
  return await prisma.qcParameterInputDefinition.update({
    where: { id },
    data,
  })
}
