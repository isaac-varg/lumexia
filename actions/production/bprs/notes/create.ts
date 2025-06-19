'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"


export const createBprNote = async (data: Prisma.BprNoteUncheckedCreateInput) => {
    const res = await prisma.bprNote.create({
        data,
    });

    return res
}
