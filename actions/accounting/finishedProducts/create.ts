'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createFinishedProduct = async (data: Prisma.FinishedProductUncheckedCreateInput) => {
    const response = await prisma.finishedProduct.create({
        data,
    });

    return response
}
