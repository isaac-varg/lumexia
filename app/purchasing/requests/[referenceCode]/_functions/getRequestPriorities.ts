"use server"

import prisma from "@/lib/prisma"

export const getRequestPriorities = async () => {

    const priorities = await prisma.requestPriority.findMany({
        orderBy: {
            sequence: 'asc'
        },
    })


    return priorities
}

export type RequestPriorities = Awaited<ReturnType<typeof getRequestPriorities>>[number]
