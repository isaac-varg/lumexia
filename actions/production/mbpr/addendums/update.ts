"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const updateAddendum = async (id: string, data: Prisma.StepAddendumUncheckedUpdateInput) => {
    const response = await prisma.stepAddendum.update({
        where: {
            id,
        },
        data,
        include: {
            addendumType: true,
            step: true,
        }
    })

    return response;
}
