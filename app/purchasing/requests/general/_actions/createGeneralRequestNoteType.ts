'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createGeneralRequestNoteType = async (data: Prisma.GeneralRequestNoteTypeUncheckedCreateInput) => {
    const res = await prisma.generalRequestNoteType.create({
        data,
    });

    return res;
}
