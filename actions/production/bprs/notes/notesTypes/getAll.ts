'use server'

import prisma from "@/lib/prisma"

export const getAllBprNoteTypes = async () => {
    const types = await prisma.bprNoteType.findMany();

    return types
};

export type BprNoteType = Awaited<ReturnType<typeof getAllBprNoteTypes>>[number]
