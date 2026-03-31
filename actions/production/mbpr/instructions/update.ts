"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"

export const updateInstruction = async (id:string, data: Prisma.StepInstructionUncheckedUpdateInput, mbprId?: string) => {
    const response = await prisma.stepInstruction.update({
        where: {
            id,
        },
        data,
    })

    if (mbprId) {
        await createActivityLog('Instruction Updated', 'mbpr', mbprId, { context: 'Updated a work instruction' })
    }

    return response;
}
