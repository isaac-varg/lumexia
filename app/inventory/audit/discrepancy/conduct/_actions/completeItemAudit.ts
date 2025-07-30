'use server'

import { staticRecords } from "@/configs/staticRecords"
import prisma from "@/lib/prisma"
import { DiscrepancyItem } from "./getDiscrepancyItem"
import { createNote } from "./createNote"
import { getUserId } from "@/actions/users/getUserId"
import { getUser } from "@/actions/users/getUser"

export const completeAuditItem = async (discrepancyItem: DiscrepancyItem) => {

    const user = await getUser()

    // change status
    const response = await prisma.discrepancyAuditItem.update({
        where: {
            id: discrepancyItem.id,
        },
        data: {
            statusId: staticRecords.inventory.discrepancyAudits.items.statuses.audited,
        }
    })


    // make a note
    await createNote({
        auditItemId: discrepancyItem.id,
        userId: staticRecords.app.lumexia,
        noteTypeId: staticRecords.inventory.discrepancyAudits.items.notes.types.automated,
        content: `${user.name} completed the audit of the ${discrepancyItem.item.name}`
    });

    return response;
}
