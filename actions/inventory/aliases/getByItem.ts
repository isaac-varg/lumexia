"use server"

import prisma from "@/lib/prisma"

export const getAliasByItem = async (itemId: string) => {
    const aliases = prisma.alias.findMany({
        where: {
            itemId,
        },
        include: {
            supplierAlias: {
                include: {
                    supplier: true
                }
            },
            aliasType: true
        }
    });

    return aliases
}

export type ItemAlias = Awaited<ReturnType<typeof getAliasByItem>>[number] 
