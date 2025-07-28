"use server"

import prisma from "@/lib/prisma"
import { InventoryLot, getLotsByItem } from "@/actions/auxiliary/getLotsByItem";


export const getOnHandByItem = async (itemId: string) => {

    const item = await prisma.item.findUnique({ where: { id: itemId } });
    const lots: InventoryLot[] = await getLotsByItem(itemId);

    const totalOnHand = lots.reduce(
        (accumulator: number, current: any) => accumulator + current.totalQuantityOnHand, 0
    );

    const lastAudited = await prisma.inventoryAudit.findFirst({
        where: {
            itemId,
        },
        include: {
            user: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
        take: 1
    });



    return {
        item,
        lots,
        lastAudited,
        totalQuantityOnHand: totalOnHand,
    }

}


