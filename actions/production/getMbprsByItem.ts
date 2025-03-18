"use server"

import prisma from "@/lib/prisma"

export const getMbprsByItem = async (itemId: string) => {
   
    const mbprs = await prisma.masterBatchProductionRecord.findMany({
        where: {
            producesItemId: itemId,
        },
        include: {
            BatchSize: true,
            BillOfMaterial: true,
        }
    });

    return mbprs
};

export type MbprByItem = Awaited<ReturnType<typeof getMbprsByItem>>[number]
