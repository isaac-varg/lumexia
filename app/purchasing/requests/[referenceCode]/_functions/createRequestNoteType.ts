"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache";

export const createRequestNoteType = async (payload: Prisma.RequestNoteTypeUncheckedCreateInput) => {
        
    const response = await prisma.requestNoteType.create({
        data: payload,
    });

    revalidatePath('/purchasing/requests/[referenceCode]');

    return response
}
