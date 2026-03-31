"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"

export const createAddedum = async (data: Prisma.StepAddendumUncheckedCreateInput, mbprId?: string) => {
    const response = await prisma.stepAddendum.create({
        data,
        include: {
            step: true,
            addendumType: true,
        }
    })

    if (mbprId) {
        await createActivityLog('Addendum Added', 'mbpr', mbprId, { context: `Added ${response.addendumType.name} addendum to step ${response.step.sequence}` })
    }

    return response;
}
