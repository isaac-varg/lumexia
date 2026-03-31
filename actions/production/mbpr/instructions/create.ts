"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"

export const createInstruction = async (data: Prisma.StepInstructionUncheckedCreateInput, mbprId?: string) => {
    const response = await prisma.stepInstruction.create({
        data,
        include: {
            step: true
        }
    })

    if (mbprId) {
        await createActivityLog('Instruction Added', 'mbpr', mbprId, { context: `Added instruction to step ${response.step.sequence}` })
    }

    return response;
}
