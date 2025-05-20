'use server'
import { staticRecords } from "@/configs/staticRecords";
import prisma from "@/lib/prisma";

export const getPricingMbpr = async (id: string) => {
    const mbpr = await prisma.masterBatchProductionRecord.findFirst({
        where: {
            id,
        },
        include: {
            BatchSize: {
                where: {
                    recordStatusId: staticRecords.app.recordStatuses.active
                },
                include: {
                    batchSizeCompoundingVessels: {
                        include: {
                            compoundingVessel: true
                        }
                    }
                }
            }
        }
    });

    return mbpr
}

export type PricingMbpr = Awaited<ReturnType<typeof getPricingMbpr>>

