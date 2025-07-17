"use server"

import prisma from "@/lib/prisma"

export const getAllGeneralRequestNoteTypes = async () => {
    const types = await prisma.generalRequestNoteType.findMany();

    return types
}

export type GeneralRequestNoteType = Awaited<ReturnType<typeof getAllGeneralRequestNoteTypes>>[number] 
