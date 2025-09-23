'use server'

import prisma from "@/lib/prisma";

export const handleResultSubmission = async (qcRecordId: string, parameterId: string, itemParameterId: string, data: Record<string, any>) => {

  const { value, ...inputDefinitions } = data;
  const result = await prisma.qcParameterResult.create({
    data: {
      qcRecordId,
      qcParameterId: parameterId,
      qcItemParameterId: itemParameterId,
      value,
    }
  })

  await Promise.all(Object.keys(inputDefinitions).map(async (id) => {
    const value = inputDefinitions[id];
    return await prisma.qcParameterInputResult.create({
      data: {
        qcResultId: result.id,
        parameterInputDefinitionId: id,
        value,
      }
    });
  }));

  return result;

}
