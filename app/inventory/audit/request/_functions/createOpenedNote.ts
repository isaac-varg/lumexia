"use server"

import { getUserId } from "@/actions/users/getUserId"
import { staticRecords } from "@/configs/staticRecords";
import prisma from "@/lib/prisma"

export const createOpenedNote = async (requestId: string) => {

    const userId = await getUserId();
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: userId,
        }
    });

    const response = await prisma.auditRequestNote.create({
        data: {
            userId,
            requestId,
            noteTypeId: staticRecords.inventory.auditRequests.requestNoteTypes.automated,
            content: `${user.name} opened this audit request.` 
        }
    })

    return response
    
}
