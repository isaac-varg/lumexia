"use server"

import prisma from "@/lib/prisma"

export const getRequestNotes = async (requestId: string) => {
    
    const notes = await prisma.requestNote.findMany({
        where: {
            requestId,
        },
        include: {
            noteType: true,
            user: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return notes;

}

export type RequestNote = Awaited<ReturnType<typeof getRequestNotes>>[number];
