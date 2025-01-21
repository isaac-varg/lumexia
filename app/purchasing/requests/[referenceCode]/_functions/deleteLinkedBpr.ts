"use server"

import { revalidatePage } from "@/actions/app/revalidatePage"
import prisma from "@/lib/prisma"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"

export const deleteLinkedBpr = async (id: string, requestId: string) => {
    await prisma.requestBpr.delete({
        where: {
            id,
        }
    })

    revalidatePage('/purchasin/requests/[referenceCode]')
    await createActivityLog('deleteLinkedBpr', 'requestId', requestId, { context: 'Deleted linked Bpr' })
}
