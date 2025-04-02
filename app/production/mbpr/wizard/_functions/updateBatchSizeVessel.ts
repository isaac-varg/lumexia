'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const updateBatchSizeVessel = async (id: string, data: Prisma.BatchSizeCompoundingVesselUncheckedUpdateInput) => {

    const respons = await prisma.batchSizeCompoundingVessel.update({
        where: {
            id,
        },
        data,
    })

    return respons;
}
