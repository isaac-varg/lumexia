"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"

export const updateAddendum = async (id: string, data: Prisma.StepAddendumUncheckedUpdateInput, mbprId?: string) => {
    const response = await prisma.stepAddendum.update({
        where: {
            id,
        },
        data,
        include: {
            addendumType: true,
            step: true,
        }
    })

    if (mbprId) {
        await createActivityLog('Addendum Updated', 'mbpr', mbprId, { context: `Updated addendum on step ${response.step.sequence}` })
    }

    return response;
}
