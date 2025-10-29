'use server'

import prisma from "@/lib/prisma";

export const handleResultSubmission = async (qcRecordId: string, parameterId: string, itemParameterId: string, data: Record<string, any>) => {

  const { value, inputDefinitions } = data;
  const result = await prisma.qcParameterResult.create({
    data: {
      qcRecordId,
      qcParameterId: parameterId,
      qcItemParameterId: itemParameterId,
      value,
    }
  })

  if (inputDefinitions && Array.isArray(inputDefinitions)) {
    await Promise.all(inputDefinitions.map(async (def: any) => {
      return await prisma.qcParameterInputResult.create({
        data: {
          qcResultId: result.id,
          parameterInputDefinitionId: def.id,
          value: def.value,
        }
      });
    }));
  }

  return result;

}
