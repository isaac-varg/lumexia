"use server"

import prisma from "@/lib/prisma"

export const deleteInstruction = async (instructionId: string) => {

    const response = await prisma.stepInstruction.delete({
        where: {
            id: instructionId,
        }
    });

    return response
}



