"use server"

import prisma from "@/lib/prisma";

export const handleResultUpdate = async (parameterResultId: string, data: Record<string, any>) => {


  const { value, ...inputDefinitions } = data;

  const result = await prisma.qcParameterResult.update({
    where: {
      id: parameterResultId,
    },
    data: {
      value,
    }
  })

  await Promise.all(Object.keys(inputDefinitions).map(async (definitionKey) => {
    const value = inputDefinitions[definitionKey];
    const inputResultId = definitionKey.split('_')[1];

    console.log('resid', inputResultId)

    return await prisma.qcParameterInputResult.update({
      where: {
        id: inputResultId,
      },
      data: {
        value,
      }
    });
  }));

  return result;


}
