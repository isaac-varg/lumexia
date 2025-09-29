"use server"

import prisma from "@/lib/prisma";
import { ParameterInput } from "../_components/examination/results/ParameterInput";

export const handleResultUpdate = async (parameterResultId: string, data: ParameterInput) => {


  const { value } = data;

  const result = await prisma.qcParameterResult.update({
    where: {
      id: parameterResultId,
    },
    data: {
      value,
    }
  })


  await Promise.all(data.inputDefinitions.map(async (def) => {
    return await prisma.qcParameterInputResult.update({
      where: {
        id: def.resultId
      },
      data: {
        value: def.value,
      }
    })
  }))

  return result;


}
