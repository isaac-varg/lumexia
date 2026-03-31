'use server'

import prisma from "@/lib/prisma"

export const getAllMbprNoteTypes = async () => {
    const types = await prisma.mbprNoteType.findMany();

    return types
};

export type MbprNoteType = Awaited<ReturnType<typeof getAllMbprNoteTypes>>[number]
