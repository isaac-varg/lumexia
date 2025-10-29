"use server"

import prisma from "@/lib/prisma"
import { InventoryLot, getLotsByItem } from "@/actions/auxiliary/getLotsByItem";
import { recordStatuses } from "@/configs/staticRecords/recordStatuses";


export const getOnHandByItem = async (itemId: string) => {

    const item = await prisma.item.findFirst({
        where: {
            id: itemId,
            recordStatusId: {
                not: recordStatuses.archived
            }
        }
    });
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


