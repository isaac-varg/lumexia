"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache";

export const updateRequest = async (requestId: string, data: Prisma.PurchasingRequestUncheckedUpdateInput) => {
    const response = await prisma.purchasingRequest.update({
        where: {
            id: requestId
        },
        data,
    })

    revalidatePath('/purchasing/requests/[referenceCode]')
    return response
};
