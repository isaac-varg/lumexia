'use server'
import prisma from "@/lib/prisma";

export const getPlanningBprs = async () => {
    const bprs = await prisma.batchProductionRecord.findMany({
        include: {
            status: true,
            mbpr: {
                include: {
                    producesItem: true
                }
            },
            lotOrigin: {
                include: {
                    lot: true
                }
            }

        }
    })

    const fixed = await Promise.all(bprs.map(async (bpr) => {
        return {
            ...bpr,
            producedItemName: bpr.mbpr.producesItem.name,
            bprStatusName: bpr.status.name,
        }
    }));

    return fixed;
}


export type PlanningBpr = Awaited<ReturnType<typeof getPlanningBprs>>[number];
