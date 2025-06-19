'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"


export const createBprNoteType = async (data: Prisma.BprNoteTypeUncheckedCreateInput) => {
    const res = await prisma.bprNoteType.create({
        data,
    });

    return res
};
