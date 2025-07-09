'use server'
import { s3 } from "@/lib/s3"
import prisma from "@/lib/prisma"

export const getAccountingFilesByPo = async (poId: string) => {

    const filesFromDb = await prisma.poAccountingFile.findMany({
        where: {
            purchaseOrderId: poId,
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

    // presign url
    const filesWithUrls = await Promise.all(
        filesFromDb.map(async (poFile) => {
            const url = await s3.presignedGetObject(
                poFile.file.bucketName,
                poFile.file.objectName,
                3600
            );

            return {
                ...poFile,
                url: url,
            };
        })
    );

    return filesWithUrls;
}

export type AccountingFile = Awaited<ReturnType<typeof getAccountingFilesByPo>>[number]
