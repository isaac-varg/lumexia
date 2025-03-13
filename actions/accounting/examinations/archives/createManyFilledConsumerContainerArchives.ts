'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"


export const createManyFilledConsumerContainerArchive = async (data: Prisma.ItemConsumerContainerArchiveUncheckedCreateInput[]) => {

    const response = await prisma.itemConsumerContainerArchive.createMany({
        data,
    })

    return response

}

export type FilledConsumerContainerArhivePayload = Prisma.ItemConsumerContainerArchiveUncheckedCreateInput
