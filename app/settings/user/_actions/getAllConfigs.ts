'use server'

import prisma from "@/lib/prisma"

export const getAllUserConfigs = async (userId: string) => {
  const configs = await prisma.userConfig.findMany({
    where: {
      userId,
    },
    include: {
      configGroup: true,
    }
  });

  return configs
}

export type UserConfig = Awaited<ReturnType<typeof getAllUserConfigs>>[number];
