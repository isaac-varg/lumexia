'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createPoAccountingFile = async (data: Prisma.PoAccountingFileUncheckedCreateInput) => {
    const response = await prisma.poAccountingFile.create({
        data,
    })

    return response
}
