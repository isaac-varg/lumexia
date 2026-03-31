"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"

export const createActionable = async (data: Prisma.StepActionableUncheckedCreateInput, mbprId?: string) => {

    const response = await prisma.stepActionable.create({
        data,
        include: {
            actionableType: true,
            step: true
        }
    })

    if (mbprId) {
        await createActivityLog('Actionable Added', 'mbpr', mbprId, { context: `Added ${response.actionableType.name} actionable to step ${response.step.sequence}` })
    }

    return response;
}
