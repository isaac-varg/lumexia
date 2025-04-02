"use server"

import prisma from "@/lib/prisma"


export const getOneBatchSize = async (id: string) => {
    const size = await prisma.batchSize.findFirstOrThrow({
        where: {
            id,
        },
        include: {
            uom: true,
            batchSizeCompoundingVessels: {
                include: {
                    compoundingVessel: {
                        include: {
                            equipment: true
                        }
                    }

                }
            }
        }
    })

    return size
}

export type SingleBatchSize = Awaited<ReturnType<typeof getOneBatchSize>>
