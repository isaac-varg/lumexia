"use server"

import prisma from "@/lib/prisma"

export const getRequest = async (id: string) => {

    const response = await prisma.purchasingRequest.findFirstOrThrow({
        where: {
            id,
        },
        include: {
            status: true,
            priority: true,
            item: true,
            requestingUser: true
        }
    })

    return response
}

export type RequestDetails = Awaited<ReturnType<typeof getRequest>>
