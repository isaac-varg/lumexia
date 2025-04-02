'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createBatchSizeCompoundingVessel = async (data: Prisma.BatchSizeCompoundingVesselUncheckedCreateInput) => {

    const response = await prisma.batchSizeCompoundingVessel.create({
        data,
    })

    return response
}
