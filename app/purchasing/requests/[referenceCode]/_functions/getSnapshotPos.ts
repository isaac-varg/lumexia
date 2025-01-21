"use server"

import prisma from "@/lib/prisma"

export const getSnapshotPos = async (snapshotPoIds: string[]) => {

    const poPromises =  snapshotPoIds.map(async (poId) => {
        const response = await prisma.purchaseOrder.findFirst({
            where: {
                id: poId,
            },
            include: {
                supplier: true
            }
        });

        return response
    });

    const pos = await Promise.all(poPromises);

    return pos;
}


type SnapshotPos = Awaited<ReturnType<typeof getSnapshotPos>>

export type SnapshotPo = SnapshotPos[number]
