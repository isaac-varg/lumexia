"use server"

import { revalidatePage } from "@/actions/app/revalidatePage";
import { getUserId } from "@/actions/users/getUserId"
import { staticRecords } from "@/configs/staticRecords";
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export const completeAuditRequest = async (requestId: string, itemId: string) => {

    const userId = await getUserId();
    const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } })

    // create the inventory audit entry
    const response = await prisma.inventoryAudit.create({
        data: {
            itemId,
            conductedById: userId,
        }
    });

    // make an automated note

    const note = await prisma.auditRequestNote.create({
        data: {
            requestId,
            noteTypeId: staticRecords.inventory.auditRequests.requestNoteTypes.automated,
            userId,
            content: `${user.name} Completed the Audit Request.`
        }
    })

    //update the request
    const requestUpdate = await prisma.auditRequest.update({
        where: {
            id: requestId
        },
        data: {
            statusId: staticRecords.inventory.auditRequests.statuses.completed,
            inventoryAuditId: response.id,
        }
    });

    revalidatePath('/inventory/audit')
    
    return response;
}
