"use server"

import prisma from "@/lib/prisma"

export const getAllEquipmentTypes = async () => {
     const types = await prisma.equipmentType.findMany()

     return types
}

export type EquipmentType = Awaited<ReturnType<typeof getAllEquipmentTypes>>[number]
