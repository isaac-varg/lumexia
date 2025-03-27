'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";


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
