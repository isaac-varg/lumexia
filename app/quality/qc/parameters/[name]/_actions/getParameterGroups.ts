'use server'

import prisma from "@/lib/prisma"

// separating because this is the only place this will really be used

export const getParameterGroups = async (parameterId: string) => {
  const groups = prisma.qcGroupParameter.findMany({
    where: {
      parameterId,
    },
    include: {
      group: true,
    }
  });

  return groups
};

export type ParameterGroup = Awaited<ReturnType<typeof getParameterGroups>>[number];
