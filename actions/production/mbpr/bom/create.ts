"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createMbprBOM = async (data: Prisma.BillOfMaterialUncheckedCreateInput) => {
    const response = await prisma.billOfMaterial.create({
        data,
        include: {
            item: true
        }
    })

    return response;

}


