"use server"

import { staticRecords } from "@/configs/staticRecords"
import prisma from "@/lib/prisma"

export const getBprs = async () => {
    const bprs = await prisma.batchProductionRecord.findMany({
        where: {
            bprStatusId: {
                not: staticRecords.production.bprStatuses.released,
            }
        }
    });

    return bprs
}
