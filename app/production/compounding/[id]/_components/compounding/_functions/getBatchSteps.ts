"use server"

import bprBatchStepActions from "@/actions/production/bprBatchSteps"
import prisma from "@/lib/prisma"

export const getBatchSteps = async (bprId: string) => {


    const batchSteps = await prisma.bprBatchStep.findMany({
        where: {
            bprId,
        },
        include: {
            batchStep: true,
            bpr: true,
            bprStepActionables: {
                include: {
                    stepActionable: true
                }
            }
        }
    })

    return batchSteps

}
