'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createAuxiliary = async (data: Prisma.FinishedProductAuxiliaryUncheckedCreateInput) => {
    const res = await prisma.finishedProductAuxiliary.create({
        data,
    })

    return res;
}
