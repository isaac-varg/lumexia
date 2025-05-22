'use server'

import prisma from "@/lib/prisma"

export const getAllQcParameters = async () => {
    const parameters = await prisma.qcParameter.findMany();

    return parameters;
}

export type QcParameter = Awaited<ReturnType<typeof getAllQcParameters>>[number]
