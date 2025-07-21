'use server'

import prisma from "@/lib/prisma"

export const createGeneralRequestFile = async (generalRequestId: string, fileId: string) => {
    const res = await prisma.generalRequestFile.create({
        data: {
            generalRequestId,
            fileId
        }
    });

    return res
}
