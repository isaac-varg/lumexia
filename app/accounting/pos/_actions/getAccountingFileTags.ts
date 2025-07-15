"use server"

import prisma from "@/lib/prisma"

export const getAccountingFileTags = async () => {
    const tags = await prisma.poAccountingFileType.findMany();

    return tags;
}

export type AccountingFileTypes = Awaited<ReturnType<typeof getAccountingFileTags>>[number]
