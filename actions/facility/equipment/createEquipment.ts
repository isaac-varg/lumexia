"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createEquipment = async (data: Prisma.EquipmentUncheckedCreateInput) => {
    const response = await prisma.equipment.create({
        data,
    });

    return response
};
