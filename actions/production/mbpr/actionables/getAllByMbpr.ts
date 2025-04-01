"use server"

import prisma from "@/lib/prisma"

export const getAllActionablesByMbpr = async (mbprId: string) => {
    const actionables = await prisma.stepActionable.findMany({
        where: {
            step: {
                mbprId,
            }
        },
        include: {
            step: true,
            actionableType: true,
        }
    })

    return actionables;
}

export type Actionable = Awaited<ReturnType<typeof getAllActionablesByMbpr>>[number]
