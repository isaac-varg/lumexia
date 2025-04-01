"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const updateActionable = async (id: string, data: Prisma.StepActionableUncheckedUpdateInput) => {

    const respons = await prisma.stepActionable.update({
        where: {
            id,
        },
        data,
        include: {
            step: true,
            actionableType: true
        }
    })

    return respons
}
