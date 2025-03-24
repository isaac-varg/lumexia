"use server"

import { staticRecords } from "@/configs/staticRecords";
import prisma from "@/lib/prisma"

export const getActiveMbpr = async (itemId: string) => {
   
    const mbpr = await prisma.masterBatchProductionRecord.findFirstOrThrow({
        where: {
            producesItemId: itemId,
            recordStatusId: staticRecords.app.recordStatuses.active,
        },
        include: {
            BatchSize: {
                include: {
                    recordStatus: true,
                }
            },
            BillOfMaterial: true,
        }
    });

    return mbpr
};

export type ActiveMbpr = Awaited<ReturnType<typeof getActiveMbpr>>
