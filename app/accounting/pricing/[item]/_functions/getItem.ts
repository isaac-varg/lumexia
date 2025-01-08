"use server"

import prisma from "@/lib/prisma"

export const getItem = async ( itemId: string ) => {
    
    const response = await prisma.item.findUniqueOrThrow({
        where: {
            id: itemId,
        },
        include: {
            aliases: true,
            itemType: true,
        }
    });

    return response;
}
