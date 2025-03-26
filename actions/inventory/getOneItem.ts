"use server"

import prisma from "@/lib/prisma"

export const getOneItem = async (id: string) => {
    const item = await prisma.item.findFirstOrThrow({
        where: {
            id,
        },
        include: {
            itemType: true,
        }
    })

    return item
}

export type SingleItem = Awaited<ReturnType<typeof getOneItem>>
