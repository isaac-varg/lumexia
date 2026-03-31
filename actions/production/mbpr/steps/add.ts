"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"

export const addBatchStep = async (data: Prisma.BatchStepUncheckedCreateInput) => {
    const response = await prisma.batchStep.create({
        data,
        include: {
            StepActionable: true,
            StepAddendum: true,
            StepEquipment: true,
            StepInstruction: true,
            BillOfMaterial: {
                include: {
                    item: true
                }
            },
        }

    })

    await createActivityLog('Batch Step Added', 'mbpr', data.mbprId, { context: `Added step ${response.sequence} — ${response.label || response.phase}` })

    return response
}


export type WizardBatchStep = Awaited<ReturnType<typeof addBatchStep>>
