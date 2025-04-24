'use server'

import prisma from "@/lib/prisma"

export const getItemIdFromLot = async (lotId: string) => {
    const item = await prisma.lot.findFirstOrThrow({
        where: {
            id: lotId,
        },
    })

    return item.itemId
}
