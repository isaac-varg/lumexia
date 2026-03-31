"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { recordStatuses } from "@/configs/staticRecords/recordStatuses"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"

export const updateMbpr = async (id: string, data: Prisma.MasterBatchProductionRecordUncheckedUpdateInput) => {
    if (data.recordStatusId === recordStatuses.active) {
        const mbpr = await prisma.masterBatchProductionRecord.findUniqueOrThrow({
            where: { id },
            select: { producesItemId: true },
        })

        const response = await prisma.$transaction([
            prisma.masterBatchProductionRecord.updateMany({
                where: {
                    producesItemId: mbpr.producesItemId,
                    recordStatusId: recordStatuses.active,
                    id: { not: id },
                },
                data: { recordStatusId: recordStatuses.inactive },
            }),
            prisma.masterBatchProductionRecord.update({
                where: { id },
                data,
            }),
        ])

        await createActivityLog('Status Changed to Active', 'mbpr', id, { context: 'MBPR status changed to active, other active MBPRs for this product were deactivated' })
        return response[1]
    }

    const response = await prisma.masterBatchProductionRecord.update({
        where: { id },
        data,
    })

    if (data.recordStatusId) {
        await createActivityLog('Status Updated', 'mbpr', id, { context: `MBPR status updated` })
    } else {
        await createActivityLog('MBPR Updated', 'mbpr', id, { context: 'MBPR details updated' })
    }

    return response
};
