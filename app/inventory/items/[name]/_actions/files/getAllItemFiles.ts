'use server'

import { fileActions } from "@/actions/files"
import prisma from "@/lib/prisma"

export const getAllItemFiles = async (itemId: string) => {
  const files = await prisma.itemFile.findMany({
    where: {
      itemId,
    },
    include: {
      fileType: true,
      file: {
        include: {
          uploadedBy: true
        }
      }
    }
  })

  const transformedData = await Promise.all(files.map(async (file) => {
    const url = await fileActions.getUrl(file.file.bucketName, file.file.objectName);

    return {
      ...file,
      url,
    }
  }))

  return transformedData;

}

export type ItemFile = Awaited<ReturnType<typeof getAllItemFiles>>[number]
