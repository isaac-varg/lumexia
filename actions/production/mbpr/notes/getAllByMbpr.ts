'use server'

import prisma from "@/lib/prisma"
import { resolveNoteFiles } from "@/actions/notes/resolveNoteFiles"

export const getAllMbprNotes = async (mbprId: string) => {
    const notes = await prisma.mbprNote.findMany({
        where: {
            mbprId,
        },
        include: {
            user: true,
            noteType: true,
            files: { include: { file: true } },
        }
    });

    return resolveNoteFiles(notes);
};

export type MbprNote = Awaited<ReturnType<typeof getAllMbprNotes>>[number];
