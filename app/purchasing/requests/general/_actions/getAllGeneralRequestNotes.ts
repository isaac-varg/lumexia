"use server"

import prisma from "@/lib/prisma"

export const getAllGeneralRequestNotes = async (requestId: string) => {
    const notes = await prisma.generalRequestNote.findMany({
        where: {
            requestId,
        },
        include: {
            noteType: true,
            user: true,
        }
    })

    return notes;
}

export type GeneralRequestNote = Awaited<ReturnType<typeof getAllGeneralRequestNotes>>[number]
