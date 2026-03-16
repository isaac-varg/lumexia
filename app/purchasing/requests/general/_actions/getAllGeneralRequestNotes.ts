"use server"

import prisma from "@/lib/prisma"
import { resolveNoteFiles } from "@/actions/notes/resolveNoteFiles"

export const getAllGeneralRequestNotes = async (requestId: string) => {
    const notes = await prisma.generalRequestNote.findMany({
        where: {
            requestId,
        },
        include: {
            noteType: true,
            user: true,
            files: { include: { file: true } },
        }
    })

    return resolveNoteFiles(notes);
}

export type GeneralRequestNote = Awaited<ReturnType<typeof getAllGeneralRequestNotes>>[number]
