'use server'

import prisma from "@/lib/prisma"

export const getPriorities = async () => {
    const response = await prisma.requestPriority.findMany();

    return response;
}

export type RequestPriority = Awaited<ReturnType<typeof getPriorities>>[number]
