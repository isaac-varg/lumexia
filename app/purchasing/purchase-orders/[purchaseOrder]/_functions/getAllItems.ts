"use server"

import prisma from "@/lib/prisma"
import { kill } from "process"

export const getAllItems = async () => {

    const items = await prisma.item.findMany({
        include: {
            aliases: true
        }
    })

    return items
}

export type AddableItemForPO = Awaited<ReturnType<typeof getAllItems>>[number]

