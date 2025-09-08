'use server'

import { getFileUrl } from "@/actions/files/getUrl";
import prisma from "@/lib/prisma"

export const getBprStagings = async (bprBomId: string) => {
  const stagings = await prisma.bprStaging.findMany({
    where: {
      bprBomId,
    },
    include: {
      lot: true,
      pulledByUser: true,
      uom: true,
      status: true,
      files: {
        include: {
          file: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc',
    }
  });

  const stagingsWithFileUrls = await Promise.all(
    stagings.map(async (staging) => {
      const filesWithUrls = await Promise.all(
        staging.files.map(async (fileOnStaging) => {
          const url = await getFileUrl(fileOnStaging.file.bucketName, fileOnStaging.file.objectName)
          const fileWithUrl = { ...fileOnStaging.file, url };
          return { ...fileOnStaging, file: fileWithUrl };
        })
      );
      return { ...staging, files: filesWithUrls };
    })
  );

  return stagingsWithFileUrls;
};

export type BprStagingItem = Awaited<ReturnType<typeof getBprStagings>>[number]
