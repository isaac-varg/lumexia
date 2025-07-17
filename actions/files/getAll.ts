"use server"

import prisma from "@/lib/prisma"

export const getFiles = async () => {
    const files = await prisma.file.findMany({
        include: {
            uploadedBy: true
        },
    });

    return files;
}

export type LumexiaFile = Awaited<ReturnType<typeof getFiles>>[number]
