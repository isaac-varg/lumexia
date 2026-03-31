"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"

export const createMbprBOM = async (data: Prisma.BillOfMaterialUncheckedCreateInput) => {
    const response = await prisma.billOfMaterial.create({
        data,
        include: {
            item: true
        }
    })

    await createActivityLog('BOM Item Added', 'mbpr', data.mbprId, { context: `Added ${response.item.name} to BOM` })

    return response;

}
