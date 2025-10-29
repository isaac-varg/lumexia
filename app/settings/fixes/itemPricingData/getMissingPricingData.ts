'use server'

import { recordStatuses } from "@/configs/staticRecords/recordStatuses"
import prisma from "@/lib/prisma"


export const getMissingPricingData = async () => {

    const missing = await prisma.item.findMany({
        where: {
            recordStatusId: {
                not: recordStatuses.archived
            },
            itemPricingData: {
                none: {}
            }
        }
    })

    return missing;
}


