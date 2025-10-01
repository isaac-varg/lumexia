"use server"

import { appConfigGroups } from "@/configs/staticRecords/appConfigGroups"
import prisma from "@/lib/prisma"

type ConfigGroup = keyof typeof appConfigGroups

export const getConfigByGroup = async (group: ConfigGroup) => {
  const configs = await prisma.config.findMany({
    where: {
      configGroupId: appConfigGroups[group]
    },
  })

  return configs
}


