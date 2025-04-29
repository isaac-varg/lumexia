'use server'

import { staticRecords } from "@/configs/staticRecords"
import prisma from "@/lib/prisma"

// does not actually delete but hides it via record status

export const deleteFinishedProduct = async (id: string) => {

    const response = await prisma.finishedProduct.update({
        where: {
            id,
        },
        data: {
            recordStatusId: staticRecords.app.recordStatuses.archived,
        }
    })

    return response;
}

