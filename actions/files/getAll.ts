"use server"

import prisma from "@/lib/prisma"

export const getFiles = async () => {
    const files = await prisma.file.findMany({
        include: {
            uploadedBy: true
        },
        select: {
            id: true,
            name: true,
            objectName: true,
            bucketName: true,
            thumbnailObjectName: true,
            thumbnailBucketName: true,
            mimeType: true,
            uploadedBy: {
                select: {
                    name: true,
                    image: true,
                }
            },
        }
    });

    return files;
}

export type LumexiaFile = Awaited<ReturnType<typeof getFiles>>[number]
