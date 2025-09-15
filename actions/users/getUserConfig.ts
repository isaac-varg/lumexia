'use server'

import prisma from "@/lib/prisma"
import { getUserId } from "./getUserId"

export const getUserConfig = async (configName: string) => {

  const userId = await getUserId()
  if (!userId) {
    throw new Error("userId not found")
  }

  const config = prisma.userConfig.findFirst({
    where: {
      name: configName,
      userId,
    },
  });

  return config;
}
