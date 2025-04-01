"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const updateInstruction = async (id:string, data: Prisma.StepInstructionUncheckedUpdateInput) => {
    const response = await prisma.stepInstruction.update({
        where: {
            id,
        },
        data,
    })

    return response;
}
