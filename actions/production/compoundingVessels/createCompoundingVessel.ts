"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createCompoundingVessel = async (data: Prisma.CompoundingVesselUncheckedCreateInput) => {
    const response = await prisma.compoundingVessel.create({
        data,
    })

    return response
}
