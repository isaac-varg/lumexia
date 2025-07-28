'use server'

import { getOnHandByItem } from "@/actions/inventory/inventory/getOnHandByItem";
import prisma from "@/lib/prisma"

export const getDisrepancyItem = async (itemId: string) => {

    const item = await prisma.discrepancyAuditItem.findFirstOrThrow({
        where: {
            itemId,
        },
        include: {
            notes: {
                include: {
                    noteType: true,
                    user: true,
                }
            },
            item: true,
        }
    });

    const inventory = await getOnHandByItem(item.itemId);

    return {
        ...item,
        lots: inventory.lots,
        lastAudit: inventory.lastAudited,
    }

}


export type DiscrepancyItem = Awaited<ReturnType<typeof getDisrepancyItem>>
