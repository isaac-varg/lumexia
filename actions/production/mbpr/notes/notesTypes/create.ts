'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createMbprNoteType = async (data: Prisma.MbprNoteTypeUncheckedCreateInput) => {
    const res = await prisma.mbprNoteType.create({
        data,
    });

    return res
};
