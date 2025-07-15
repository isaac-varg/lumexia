'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createAccountingNote = async (data: Prisma.PoAccountingNoteUncheckedCreateInput) => {
    const response = await prisma.poAccountingNote.create({
        data,
    });

    return response
}
