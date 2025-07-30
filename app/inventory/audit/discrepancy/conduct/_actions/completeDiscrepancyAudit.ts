'use server'

import prisma from "@/lib/prisma"
import { DiscrepancyItem } from "./getDiscrepancyItem"
import { staticRecords } from "@/configs/staticRecords"
import { getUser } from "@/actions/users/getUser"

export const completeDiscrepancyAudit = async (auditId: string, incompletedItems: DiscrepancyItem[]) => {

    // change the status of the audit
    const response = await prisma.discrepancyAudit.update({
        where: {
            id: auditId,
        },
        data: {
            statusId: staticRecords.inventory.discrepancyAudits.statuses.closed,
        }
    });

    // handle incomplete items
    const items = await Promise.all(incompletedItems.map(async (item) => {


        const user = await getUser()
        // make incomplete notes on audit item
        await prisma.discrepancyAuditItemNote.create({
            data: {
                auditItemId: item.id,
                noteTypeId: staticRecords.inventory.discrepancyAudits.items.notes.types.automated,
                userId: staticRecords.app.lumexia,
                content: `This item had a status of incomplete when the the discrepnacy audit was closed by ${user.name}`
            }
        })
        // change audit item statuses
        const response = await prisma.discrepancyAuditItem.update({
            where: {
                id: item.id,
            },
            data: {
                statusId: staticRecords.inventory.discrepancyAudits.items.statuses.incomplete,
            }
        })

        return response

    }));

    return response;
}
