"use server"

import prisma from "@/lib/prisma"

export const getInventorySnapshot = async (requestId: string) => {

    const snapshot = await prisma.requestInventorySnapshot.findFirstOrThrow({
        where: {
            requestId,
        }
    })

    return snapshot
}

export type InventorySnapshot = Awaited<ReturnType<typeof getInventorySnapshot>>
