import prisma from "@/lib/prisma"
import { on } from "events"

export const getFilledConsumerContainerArchives = async (  ) => {
    const containers = await prisma.itemConsumerContainerArchive.findMany({
        include: {
            consumerContainerArchive: {
                include: {
                    containerItem: true,
                }
            }
        }
    })

    return containers;
}

export type FilledConsumerContainerArchive = Awaited<ReturnType<typeof getFilledConsumerContainerArchives>>[number]
