'use server'

import prisma from "@/lib/prisma"
import { resolveNoteFiles } from "@/actions/notes/resolveNoteFiles"

export const getAllBprNotes = async (bprId: string) => {
    const notes = await prisma.bprNote.findMany({
        where: {
            bprId,
        },
        include: {
            user: true,
            noteType: true,
            files: { include: { file: true } },
        }
    });

    return resolveNoteFiles(notes);
};

export type BprNote = Awaited<ReturnType<typeof getAllBprNotes>>[number];
