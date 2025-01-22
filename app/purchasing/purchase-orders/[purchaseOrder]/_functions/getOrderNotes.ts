"use server"

import prisma from "@/lib/prisma";

export const getOrderNotes = async (poId: string) => {
    const notes = await prisma.purchaseOrderNote.findMany({
        where: {
            purchaseOrderId: poId,
        },
        include: {
            user: true
        }
    })


    return notes;
}


export type PONote = Awaited<ReturnType<typeof getOrderNotes>>[number]
