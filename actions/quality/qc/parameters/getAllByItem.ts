"use server"

import prisma from "@/lib/prisma"

export const getAllQcParametersByItem = async (itemId: string) => {

    const parameters = await prisma.qcItemParameter.findMany({
        where: {
            itemId,
        },
        include: {
            parameter: true
        }
    });

    return parameters;
}

export type QcItemParameter = Awaited<ReturnType<typeof getAllQcParametersByItem>>[number]
