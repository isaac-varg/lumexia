"use server"

import prisma from "@/lib/prisma"

export const getPurchasingRequests = async (itemId: string) => {

    const response = await prisma.purchasingRequest.findMany({
        where: {
            itemId,
        }
    })

    return response

}
