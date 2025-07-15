'use server'

import prisma from "@/lib/prisma"

export const getAllAccountingNotes = async () => {
    const notes = await prisma.poAccountingNote.findMany({
        include: {
            noteType: true,
            user: true
        }
    });

    return notes
}

export type AccountingNote = Awaited<ReturnType<typeof getAllAccountingNotes>>[number];
