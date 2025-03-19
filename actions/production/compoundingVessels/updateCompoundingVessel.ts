"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const updateCompoundingVessel = async (id: string, data:  Prisma.CompoundingVesselUncheckedUpdateInput) => {

    const response = await prisma.compoundingVessel.update({
        where: {
            id,
        },
        data,
    })

    return response
}
