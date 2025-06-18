'use server'

import prisma from "@/lib/prisma"

export const getAllQcParameterGroups = async () => {
    const groups = await prisma.qcParameterGroup.findMany({
        include: {
            parameters: true
        }
    });

    return groups
}

export type QcParameterGroup = Awaited<ReturnType<typeof getAllQcParameterGroups>>[number];
