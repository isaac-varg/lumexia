"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createActionable = async (data: Prisma.StepActionableUncheckedCreateInput ) => {

    const response = await prisma.stepActionable.create({
        data,
        include: {
            actionableType: true,
            step: true
        }
    })
    return response;
}
