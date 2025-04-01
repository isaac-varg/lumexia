"use server"

import prisma from "@/lib/prisma"

export const getAllAddendumsByMbpr = async (mbprId: string) => {
    const inst = await prisma.stepAddendum.findMany({
        where: {
            step: {
                mbprId,
            }
        },
        include: {
            step: true,
            addendumType: true
        }
    })

    return inst
}

export type Addendum = Awaited<ReturnType<typeof getAllAddendumsByMbpr>>[number]
