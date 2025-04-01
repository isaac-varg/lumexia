"use server"

import prisma from "@/lib/prisma"

export const deleteInstruction = async (id: string) => {

    const response = await prisma.stepInstruction.delete({
        where: {
            id,
        }
    });

    return response
}



