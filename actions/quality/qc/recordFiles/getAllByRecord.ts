'use sever'

import { getFileUrl } from "@/actions/files/getUrl";
import prisma from "@/lib/prisma"

export const getAllQcRecordFilesByRecord = async (recordId: string) => {
  const files = await prisma.qcRecordFile.findMany({
    where: {
      qcRecordId: recordId
    },
    include: {
      file: {
        include: {
          uploadedBy: true
        }
      },
      fileType: true
    }
  });

  const transformedFiles = await Promise.all(files.map(async (file) => {
    const url = await getFileUrl(file.file.bucketName, file.file.objectName);
    return {
      url,
      ...file
    }
  }));

  return transformedFiles;

}

export type QcRecordFile = Awaited<ReturnType<typeof getAllQcRecordFilesByRecord>>[number];
