'use server'

import prisma from "@/lib/prisma"
import { resolveNoteFiles } from "@/actions/notes/resolveNoteFiles"

export const getAllAccountingNotes = async () => {
    const notes = await prisma.poAccountingNote.findMany({
        include: {
            noteType: true,
            user: true,
            files: { include: { file: true } },
        }
    });

    return resolveNoteFiles(notes);
}

export type AccountingNote = Awaited<ReturnType<typeof getAllAccountingNotes>>[number];
