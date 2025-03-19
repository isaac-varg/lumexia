"use server"
import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"



export const updateEquipment = async (id: string, data: Prisma.EquipmentUncheckedUpdateInput) => {
    const response = await prisma.equipment.update({
        where: {
            id,
        },
        data,
    })

    return response;

}

