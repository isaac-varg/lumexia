'use server'

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

    return files

}

export type GeneralRequestFile = Awaited<ReturnType<typeof getAllGeneralRequestFiles>>[number];
