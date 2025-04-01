"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createInstruction = async (data: Prisma.StepInstructionUncheckedCreateInput) => {
    const response = await prisma.stepInstruction.create({
        data,
        include: {
            step: true
        }
    })

    return response;
}
