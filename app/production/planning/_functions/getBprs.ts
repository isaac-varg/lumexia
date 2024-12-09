"use server"

import prisma from "@/lib/prisma"
import { IBpr } from "@/types/batchProductionRecord";
import { MasterBatchProductionRecord } from "@/types/masterBatchProductionRecord";
import { BprStatus } from "@prisma/client";


export interface PlanningIBpr extends IBpr {
    status: BprStatus,
    mbpr: MasterBatchProductionRecord,
    producedItemName: string
    bprStatusName: string,
}

export const getBprs = async ()  => {
    const bprs = await prisma.batchProductionRecord.findMany({
        include: {
            status: true,
            mbpr: {
                include: {
                    producesItem: true
                }
            }
        }
    })

    const fixed: PlanningIBpr[] = await Promise.all(bprs.map(async (bpr) => {
        return {
            ...bpr,
            producedItemName: bpr.mbpr.producesItem.name,
            bprStatusName: bpr.status.name,
        }
    }));

    return fixed;

}
