"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const updateOneFilledConsumerContainer = async (id: string, data: Prisma.ItemConsumerContainerUncheckedUpdateInput) => {

    const response = await prisma.itemConsumerContainer.update({
        where: {
            id,
        },
        data,
    })

    

    return response;
}
