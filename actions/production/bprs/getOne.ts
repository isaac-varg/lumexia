"use server"
import prisma from "@/lib/prisma"

export const getSingleBpr = async (id: string) => {
    const bprs = await prisma.batchProductionRecord.findUnique({
        where: {
            id,
        },
        include: {
            status: true,
            batchSize: {
                include: {
                    batchSizeCompoundingVessels: {
                        include: {
                            compoundingVessel: {
                                include: {
                                    equipment: true,
                                }
                            },
                        }
                    }
                }
            },
            mbpr: {
                include: {
                    producesItem: true,
                }
            },
            lotOrigin: {
                include: {
                    lot: true
                }
            }

        }
    })

    return bprs;
}

export type BatchProductionRecord = Awaited<ReturnType<typeof getSingleBpr>>
