"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createFilledConsumerContainer = async (data: Prisma.ItemConsumerContainerUncheckedCreateInput) => {
    const response = await prisma.itemConsumerContainer.create({
        data,
        include: {
            consumerContainer: {
                include: {
                    containerItem: true
                }
            },
            uom: true
        }
    });

    return response;
}
