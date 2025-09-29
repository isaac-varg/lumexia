"use server"

import { QcTemplate } from "@/actions/quality/qc/templates/getAll"
import prisma from "@/lib/prisma"

export const handleTemplateCascade = async (itemId: string, template: QcTemplate) => {

  const parameterResponses = await Promise.all(template.parameters.map(async (p) => {
    return await prisma.qcItemParameter.create({
      data: {
        itemId,
        parameterId: p.parameter.id,
      }
    })
  }));
  return parameterResponses;
}
