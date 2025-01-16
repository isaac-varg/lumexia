"use server"

import prisma from "@/lib/prisma"

export const getLinkedBatches = async (requestId: string) => {

    const batches = await prisma.requestBpr.findMany({
        where: {
            requestId,
        },
        include: {
            bpr: {
                include: {
                    mbpr: {
                        include: {
                            producesItem: true
                        }
                    },
                    status: true,
                    batchSize: true,
                    lotOrigin: true,
                }
            }
        }
    })


    


    return batches
}

export type LinkedBatchesType = Awaited<ReturnType<typeof getLinkedBatches>>;

export type LinkedBatchEntryType = LinkedBatchesType[number];
