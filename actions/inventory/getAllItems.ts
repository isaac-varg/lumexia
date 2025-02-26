"use server"

import prisma from "@/lib/prisma"

// commandType boolean is for when using with command pallet includce command type

export const getAllItems = async (commandType?: true) => {
    const items = await prisma.item.findMany({
        include: {
            aliases: true
        }
    });

    const transformedItems = await Promise.all(items.map((item) => {
        const flatAliases = item.aliases.join("");

        return {
            ...item,
            flatAliases,
            ...(commandType ? { commandType: "item" } : {})
        }
    }));

    return transformedItems;
}


export type Item = Awaited<ReturnType<typeof getAllItems>>[number]
