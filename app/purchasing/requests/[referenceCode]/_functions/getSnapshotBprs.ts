"use server"


import prisma from "@/lib/prisma"

export const getSnapshotBprs = async (allocatedBprIds: string[]) => {
    const bprsPromises = allocatedBprIds.map(async (bprId) => {
        const response = await prisma.batchProductionRecord.findFirst({
            where: {
                id: bprId,
            },
            include: {
                mbpr: {
                    include: {
                        producesItem: true,
                    }
                },
                status: true,
            }
        });


        return response;
    });

    const bprs = await Promise.all(bprsPromises);
    return bprs;
}

type SnapshotBprs = Awaited<ReturnType<typeof getSnapshotBprs>>;

export type SnapshotBpr = SnapshotBprs[number];
