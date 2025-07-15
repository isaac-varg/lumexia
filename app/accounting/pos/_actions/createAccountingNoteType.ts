"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createAccountingNoteType = async (data: Prisma.PoAccountingNoteTypeUncheckedCreateInput) => {
    const res = await prisma.poAccountingNoteType.create({
        data,
    });

    return res
}
