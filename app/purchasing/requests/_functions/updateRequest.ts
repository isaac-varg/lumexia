"use server"

import prisma from "@/lib/prisma"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"
import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"

export const updateRequest = async (requestId: string, data: Prisma.PurchasingRequestUncheckedUpdateInput) => {
    
    const response = await prisma.purchasingRequest.update({
        where: {
            id: requestId,
        }, 
        data,
    })

    revalidatePath('/purchasing/requests');

    await createActivityLog('updatePurchasingRequest', 'purchasingRequest', requestId, {context: `the purchasing request was updated by changing either the status , dates or priority`})

    return response

}
