"use server"

import prisma from "@/lib/prisma"

export const getAllRequestPriorities = async () => {
    const response = await prisma.requestPriority.findMany();

    return response;
}

export type RequestPriority = Awaited<ReturnType<typeof getAllRequestPriorities>>[number]
