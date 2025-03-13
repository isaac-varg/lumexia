'use server'
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const createManyConsumerContainerArchives = async (data: Prisma.ConsumerContainerArchiveUncheckedCreateInput[]) => {

    const response = await prisma.consumerContainerArchive.createManyAndReturn({
        data,
    })

    return response
}

export type ConsumerContainerArchivePayload = Prisma.ConsumerContainerArchiveUncheckedCreateInput
