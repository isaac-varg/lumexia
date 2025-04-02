"use server"

import prisma from "@/lib/prisma"


export const getAllBatchSizesByMbpr = async (mbprId: string) => {
    const sizes = await prisma.batchSize.findMany({
        where: {
            mbprId,
        },
        include: {
            uom: true,
            batchSizeCompoundingVessels: {
                include: {
                    compoundingVessel:  {
                        include: {
                            equipment: true
                        }
                    }
                }
            }
          
        }
    })

    return sizes
} 

export type BatchSize = Awaited<ReturnType<typeof getAllBatchSizesByMbpr>>[number]
