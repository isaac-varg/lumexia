'use server'

import { fileActions } from "@/actions/files";
import prisma from "@/lib/prisma"

export const getAllGeneralRequestFiles = async (requestId: string) => {

    const files = await prisma.generalRequestFile.findMany({
        where: {
            generalRequestId: requestId,
        },
        include: {
            file: {
                include: {
                    uploadedBy: true
                }
            },
        }
    });

    const transformedData = await Promise.all(files.map(async (file) => {
        const url = await fileActions.getUrl(file.file.bucketName, file.file.objectName);

        return {
            ...file,
            url,
        }
    }))

    return transformedData;

}

export type GeneralRequestFile = Awaited<ReturnType<typeof getAllGeneralRequestFiles>>[number];
