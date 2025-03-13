'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"


export const createFilledConsumerContainerArchive = async (data: Prisma.ItemConsumerContainerArchiveUncheckedCreateInput) => {

    const response = await prisma.itemConsumerContainerArchive.create({
        data,
    })

    return response

}
