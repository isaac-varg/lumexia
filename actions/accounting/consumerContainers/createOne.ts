"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createOneConsumerContainer = async (data: Prisma.ConsumerContainerUncheckedCreateInput) => {

    const response = await prisma.consumerContainer.create({
        data,
    });

    return response;
}


