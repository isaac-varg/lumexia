"use server"

import prisma from "@/lib/prisma"
import { InventoryLot, getLotsByItem } from "@/actions/auxiliary/getLotsByItem";


export const getOnHandByItem = async (itemId: string) => {

    const item = await prisma.item.findUnique({ where: { id: itemId } });
    const lots: InventoryLot[] = await getLotsByItem(itemId);

    const totalOnHand = lots.reduce(
        (accumulator: number, current: any) => accumulator + current.totalQuantityOnHand, 0
    );

     

    return {
        item,
        lots,
        totalQuantityOnHand: totalOnHand,
    }

}


