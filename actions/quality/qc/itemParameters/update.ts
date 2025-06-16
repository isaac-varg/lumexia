"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const updateQcItemParameter = async (id: string, data: Prisma.QcItemParameterUncheckedUpdateInput) => {
    const response = await prisma.qcItemParameter.update({
        where: {
            id,
        },
        data,
    });

    return response
}
