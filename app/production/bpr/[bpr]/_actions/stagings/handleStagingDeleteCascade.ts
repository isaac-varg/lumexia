'use server'

import prisma from "@/lib/prisma"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";

export const handleStagingDeleteCascade = async (stagingId: string, bprId: string, bomItemName: string, quantity: number) => {

  const files = await prisma.bprStagingFile.findMany({
    where: {
      bprStagingId: stagingId,
    },
    include: {
      file: true
    }
  });

  await Promise.all(files.map(async (file) => {
    await prisma.bprStagingFile.delete({
      where: {
        id: file.id,
      }
    })
    const res = prisma.file.delete({
      where: {
        id: file.fileId,
      }
    })
    return res
  }));

  const stagingResponse = await prisma.bprStaging.delete({
    where: {
      id: stagingId
    },
  });

  await createActivityLog('removeStaging', 'bpr', bprId, { context: `Staging for ${quantity} lbs of ${bomItemName} was deleted.` })

  return stagingResponse;
}
