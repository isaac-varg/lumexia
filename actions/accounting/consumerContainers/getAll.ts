"use server"

import prisma from "@/lib/prisma"

export const getAllConsumerContainers = async () => {
    
    const containers = await prisma.consumerContainer.findMany({
        include: {
            containerItem: true,
        }
    });

    const transformedContainers = containers.map((c) => {
        return {
            ...c,
            name: c.containerItem.name
        }
    })

    return transformedContainers;
}

export type ConsumerContainer = Awaited<ReturnType<typeof getAllConsumerContainers>>[number]
