"use server"

import prisma from "@/lib/prisma"

export const getAllInstructionsByMbpr = async (mbprId:string) => {
    const inst = await prisma.stepInstruction.findMany({
        where: {
           step: {
               mbprId,
           } 
        },
        include: {
            step: true,
        }
    })

    return inst
}

export type Instructions = Awaited<ReturnType<typeof getAllInstructionsByMbpr>>[number]
