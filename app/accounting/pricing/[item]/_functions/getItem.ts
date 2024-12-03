"use server"

import prisma from "@/lib/prisma"
import { warn } from "console";

export const getItem = async ( itemId: string ) => {
    
    const response = await prisma.item.findMany({
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
