"use server"

import { revalidatePage } from "@/actions/app/revalidatePage"
import prisma from "@/lib/prisma"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"

export const deleteLinkedPo = async (id: string, requestId: string) => {
    await prisma.requestPurchaseOrder.delete({
        where: {
            id,
        }
    })

    revalidatePage('/purchasin/requests/[referenceCode]')
    await createActivityLog('deleteLinkedPo', 'requestId', requestId, { context: 'Deleted linked Po' })
}
