'use server'

import prisma from "@/lib/prisma"

export const getAllBprNotes = async (bprId: string) => {
    const notes = await prisma.bprNote.findMany({
        where: {
            bprId,
        },
        include: {
            user: true,
            noteType: true
        }
    });

    return notes
};

export type BprNote = Awaited<ReturnType<typeof getAllBprNotes>>[number];
