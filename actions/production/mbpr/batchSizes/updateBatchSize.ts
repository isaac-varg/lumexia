"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"

export const updateBatchSize = async (id: string, data: Prisma.BatchSizeUncheckedUpdateInput, mbprId?: string) => {
    const response = await prisma.batchSize.update({
        where: {
            id
        },
        data,
        include: {
            uom: true,
            batchSizeCompoundingVessels: {
                include: {
                    compoundingVessel: {
                        include: {
                            equipment: true
                        }
                    }

                }
            }
        }
    })

    if (mbprId) {
        await createActivityLog('Batch Size Updated', 'mbpr', mbprId, { context: `Updated batch size: ${response.quantity} ${response.uom.abbreviation}` })
    }

    return response;
}
