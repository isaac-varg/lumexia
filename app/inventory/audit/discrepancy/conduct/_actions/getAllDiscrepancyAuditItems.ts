'use server'

import { getOnHandByItem } from "@/actions/inventory/inventory/getOnHandByItem";
import prisma from "@/lib/prisma"

export const getAllDiscrepancyAuditItems = async (auditId: string) => {

    const items = await prisma.discrepancyAuditItem.findMany({
        where: {
            discrepancyAuditId: auditId,
        },
        include: {
            notes: {
                include: {
                    noteType: true,
                    user: true,
                }
            },
            item: true,
            status: true, 
            discrepancyAuditItemTransaction: {
                include: {
                    transaction: {
                        include: {
                            user: true
                        }
                    },

                },
                orderBy: {
                    createdAt: 'desc'
                }
            }
        }
    });

    const transformedItems = await Promise.all(items.map(async (item) => {
        const inventory = await getOnHandByItem(item.itemId);
        const lastInventoryAudit = inventory.lastAudited;
        const lastDiscrepancyAudit = item.discrepancyAuditItemTransaction.length > 0 ? item.discrepancyAuditItemTransaction[0] : null;

        return {
            ...item,
            lots: inventory.lots,
            lastInventoryAudit,
            lastDiscrepancyAudit,
        }
    }));


    return transformedItems;


}
