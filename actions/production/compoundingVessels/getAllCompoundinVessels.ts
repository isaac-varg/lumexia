"use server"

import prisma from "@/lib/prisma"

export const getAllCompoundingVessels = async () => {
    const vessels = await prisma.compoundingVessel.findMany({
        include: {
            equipment: true
        }
    });

    return vessels
}

export type CompoundingVessel = Awaited<ReturnType<typeof getAllCompoundingVessels>>[number]
