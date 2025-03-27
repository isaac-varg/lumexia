"use server"


import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const updateMbprBOM = async (id: string, data: Prisma.BillOfMaterialUncheckedUpdateInput) => {
    const response = await prisma.billOfMaterial.update({
        where: {
            id,
        },
        data,
        include: {
            item: true
        }
    })

    return response;

}


