'use server'

import prisma from "@/lib/prisma"


export const getMissingPoAccountingData = async () => {

    const missing = await prisma.purchaseOrder.findMany({
        where: {
            poAccountingDetail: null
        }
    })

    return missing;
}


