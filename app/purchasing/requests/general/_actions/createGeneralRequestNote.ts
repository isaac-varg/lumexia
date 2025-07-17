'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createGeneralRequestNote = async (data: Prisma.GeneralRequestNoteUncheckedCreateInput) => {
    
    const res = await prisma.generalRequestNote.create({
        data,
    })

    return res
}
