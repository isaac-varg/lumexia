"use server"

import prisma from "@/lib/prisma"
import { resolveNoteFiles } from "@/actions/notes/resolveNoteFiles"

export const getRequestNotes = async (requestId: string) => {

    const notes = await prisma.requestNote.findMany({
        where: {
            requestId,
        },
        include: {
            noteType: true,
            user: true,
            files: { include: { file: true } },
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return resolveNoteFiles(notes);

}

export type RequestNote = Awaited<ReturnType<typeof getRequestNotes>>[number];
