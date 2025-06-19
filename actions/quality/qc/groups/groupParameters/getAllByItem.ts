"use server"

import prisma from "@/lib/prisma"

export const getAllQcGroupsByItem = async (itemId: string) => {
    const groups = await prisma.qcGroupParameter.findMany({
        where: {
            parameter: {
                qcItemParameters: {
                    some: {
                        itemId,
                    }
                }
            }
        },
        include: {
            group: true,
            parameter: true
        }

    })

    return groups

};

export type QcGroupFromItem = Awaited<ReturnType<typeof getAllQcGroupsByItem>>[number]
