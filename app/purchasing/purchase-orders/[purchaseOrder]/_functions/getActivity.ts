"use server"

import prisma from "@/lib/prisma";

export const getActivity = async (poId: string) => {
    
    const activity = await prisma.activityLog.findMany({
        where: {
            entityType: 'purchaseOrder',
            entityId: poId, 
        },
        include: {
            user: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return activity

}

export type POActivity = Awaited<ReturnType<typeof getActivity>>[number]
