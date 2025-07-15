'use server'

import prisma from "@/lib/prisma"

export const getAllAccountingNoteTypes = async () => {
    const types = await prisma.poAccountingNoteType.findMany();
    return types;
}
