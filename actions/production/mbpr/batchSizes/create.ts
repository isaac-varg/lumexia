'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"

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

    await createActivityLog('Batch Size Created', 'mbpr', data.mbprId, { context: `Created batch size: ${response.quantity} ${response.uom.abbreviation}` })

    return response
}
