'use server'

import prisma from "@/lib/prisma"

export const getFinishedProductsByItem = async (itemId: string) => {
    const fp = await prisma.finishedProduct.findMany({
        where: {
            filledWithItemId: itemId,
        },
        include: {
            fillUom: true,
        }
    })

    return fp;
};

export type FinishedProduct = Awaited<ReturnType<typeof getFinishedProductsByItem>>[number]
