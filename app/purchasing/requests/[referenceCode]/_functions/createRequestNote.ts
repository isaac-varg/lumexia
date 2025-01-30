'use server'

import { getUserId } from "@/actions/users/getUserId"
import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"

export const createRequestNote = async (requestId: string, content: string, noteTypeId: string) => {

    const userId = await getUserId()
    const payload: Prisma.RequestNoteUncheckedCreateInput = {
        userId,
        content,
        noteTypeId,
        requestId,
    };

    const response = await prisma.requestNote.create({
        data: payload
    });

    revalidatePath('purchasing/requests/[referenceCode]')

    return response;
}


