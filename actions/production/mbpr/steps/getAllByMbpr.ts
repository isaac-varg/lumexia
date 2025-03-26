'use server'

import prisma from "@/lib/prisma"

export const getAllByMbpr = async (mbprId: string) => {

    const steps = await prisma.batchStep.findMany({
        where: {
            mbprId,
        },
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
    });

    return steps;
}

export type Step = Awaited<ReturnType<typeof getAllByMbpr>>[number]
