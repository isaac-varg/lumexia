"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"

export const updateMbprBOM = async (id: string, data: Prisma.BillOfMaterialUncheckedUpdateInput, mbprId?: string) => {
    const response = await prisma.billOfMaterial.update({
        where: {
            id,
        },
        data,
        include: {
            item: true
        }
    })

    if (mbprId) {
        await createActivityLog('BOM Item Updated', 'mbpr', mbprId, { context: `Updated ${response.item.name} in BOM` })
    }

    return response;

}
