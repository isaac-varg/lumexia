'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"


export const createBatchSize = async (data: Prisma.BatchSizeUncheckedCreateInput) => {
    const response = await prisma.batchSize.create({
        data,
        include: {
            uom: true,
            batchSizeCompoundingVessels: {
                include: {
                    compoundingVessel:  {
                        include: {
                            equipment: true
                        }
                    }
                }
            }
        }
    });

    return response
}
