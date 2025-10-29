"use server"

import { recordStatuses } from "@/configs/staticRecords/recordStatuses";
import prisma from "@/lib/prisma"
import { Item } from "@/types/item"

export interface IPricingItem extends Item{
    
}

export const getItem = async (id: string ) => {

    const response = await prisma.item.findFirstOrThrow({
        where: {
            id,
            recordStatusId: {
                not: recordStatuses.archived
            }
        },
        include: {
            procurementType: true,
        }
    })

    return response
}

