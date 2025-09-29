'use server'

import prisma from "@/lib/prisma"

export const getParameterTemplates = async (parameterId: string) => {
  const templates = await prisma.qcTemplateParameter.findMany({
    where: {
      parameterId,
    },
    include: {
      template: true,
    }
  });

  return templates
};

export type ParameterTemplate = Awaited<ReturnType<typeof getParameterTemplates>>[number];
