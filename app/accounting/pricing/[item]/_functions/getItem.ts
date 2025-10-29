"use server"

import { recordStatuses } from "@/configs/staticRecords/recordStatuses";
import prisma from "@/lib/prisma"

export const getItem = async ( itemId: string ) => {
    
    const response = await prisma.item.findFirstOrThrow({
        where: {
            id: itemId,
            recordStatusId: {
                not: recordStatuses.archived
            }
        },
        include: {
            aliases: true,
            itemType: true,
        }
    });

    return response;
}
