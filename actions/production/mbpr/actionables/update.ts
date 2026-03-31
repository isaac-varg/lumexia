"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"

export const updateActionable = async (id: string, data: Prisma.StepActionableUncheckedUpdateInput, mbprId?: string) => {

    const respons = await prisma.stepActionable.update({
        where: {
            id,
        },
        data,
        include: {
            step: true,
            actionableType: true
        }
    })

    if (mbprId) {
        await createActivityLog('Actionable Updated', 'mbpr', mbprId, { context: `Updated actionable on step ${respons.step.sequence}` })
    }

    return respons
}
