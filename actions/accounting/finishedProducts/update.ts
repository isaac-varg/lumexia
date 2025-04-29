'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const updateFinishedProduct = async (id: string, data: Prisma.FinishedProductUncheckedUpdateInput) => {
    const response = await prisma.finishedProduct.update({
        where: {
            id,
        },
        data,
    })

    return response
}
