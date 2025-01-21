"use server"

import prisma from "@/lib/prisma"

export const getOtherRequests = async (itemId: string, currentRequestId: string) => {
    // TODO filter out completed requets
    const response = await prisma.purchasingRequest.findMany({
        where: {
            itemId,
            NOT: {
                id: currentRequestId
            }

        }
    })

    return response;
}

type OtherRequests = Awaited<ReturnType<typeof getOtherRequests>>

export type OtherRequest = OtherRequests[number]
