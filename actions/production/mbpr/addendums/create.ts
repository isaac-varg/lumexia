"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createAddedum = async (data: Prisma.StepAddendumUncheckedCreateInput) => {
    const response = await prisma.stepAddendum.create({
        data,
        include: {
            step: true,
            addendumType: true,
        }
    })

    return response;
}
