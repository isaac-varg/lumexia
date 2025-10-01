'use server'

import prisma from "@/lib/prisma"
import { getUserId } from "./getUserId"
import { userConfigGroups } from "@/configs/staticRecords/userConfigGroups"

// cant use upsert because it is non-unique..
// i thought i maybe making a joined proeprty e.g., one that combines
// userId.configName and making it unique as the combination would be, but this works for now...

export const updateUserConfig = async (configName: string, value: string, configGroupId?: string) => {

  const userId = await getUserId()
  if (!userId) {
    throw new Error("userId not found")


  }
  const existingConfig = await prisma.userConfig.findFirst({
    where: {
      name: configName,
      userId,
    }
  })

  // settings exists, update
  if (existingConfig) {
    await prisma.userConfig.update({
      where: {
        id: existingConfig.id,
      },
      data: {
        value,
      }
    })
    return;
  }

  // settings dne
  await prisma.userConfig.create({
    data: {
      userId,
      configGroupId: configGroupId ?? userConfigGroups.general,
      name: configName,
      value,
    }
  })

}
