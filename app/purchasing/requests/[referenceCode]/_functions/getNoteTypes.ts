'use server'

import prisma from "@/lib/prisma"

export const getNoteTypes = async () => {
    const types = await prisma.requestNoteType.findMany({
        orderBy: {
            name: 'asc'
        }
    })

    return types;
}

export type RequestNoteType = Awaited<ReturnType<typeof getNoteTypes>>[number]
