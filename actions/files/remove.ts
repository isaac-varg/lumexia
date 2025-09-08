"use server"

import prisma from "@/lib/prisma"

export const removeFile = async (fileId: string) => {
  const response = await prisma.file.delete({
    where: {
      id: fileId,
    },
  })

  return response
};
