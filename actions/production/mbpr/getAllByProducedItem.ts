"use server"

import prisma from "@/lib/prisma";

export const getAllByProducedItem = async (producedItemId: string) => {

    const mbprs = await prisma.masterBatchProductionRecord.findMany({
        where: {
            producesItemId: producedItemId,
        },
        include: {
            producesItem: true,
            BillOfMaterial: {
                include: {
                    item: true,
                    step: true,
                }
            },
            BatchSize: {
                include: {
                    recordStatus: true
                }
            },
            recordStatus: true,
        }
    })


    return mbprs

}

export type MbprFromItem = Awaited<ReturnType<typeof getAllByProducedItem>>[number]
