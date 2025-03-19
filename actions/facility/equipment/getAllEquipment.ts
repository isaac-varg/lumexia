"use server"

import prisma from "@/lib/prisma"

export const getAllEquipment = async () => {

    const equipment = await prisma.equipment.findMany({
        include: {
            equipmentType: true,
        }
    });

    return equipment
}

export type Equipment = Awaited<ReturnType<typeof getAllEquipment>>[number]
