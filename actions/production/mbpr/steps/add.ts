"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

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

    return response
}


export type WizardBatchStep = Awaited<ReturnType<typeof addBatchStep>>
