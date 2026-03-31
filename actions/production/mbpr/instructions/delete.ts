"use server"

import prisma from "@/lib/prisma"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"

export const deleteInstruction = async (instructionId: string, mbprId?: string) => {

    const response = await prisma.stepInstruction.delete({
        where: {
            id: instructionId,
        }
    });

    if (mbprId) {
        await createActivityLog('Instruction Deleted', 'mbpr', mbprId, { context: 'Deleted a work instruction' })
    }

    return response
}
