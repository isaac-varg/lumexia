"use server"

import prisma from "@/lib/prisma"
import { Item } from "@/types/item"

export interface IPricingItem extends Item{
    
}

export const getItem = async (id: string ) => {

    const response = await prisma.item.findUniqueOrThrow({
        where: {
            id,
        },
        include: {
            procurementType: true,
        }
    })

    return response
}

