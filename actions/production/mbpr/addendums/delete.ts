"use server"

import prisma from "@/lib/prisma"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"

export const deleteAddendum = async (id: string, mbprId?: string) => {

    const response = await prisma.stepAddendum.delete({
        where: {
            id,
        }
    });

    if (mbprId) {
        await createActivityLog('Addendum Deleted', 'mbpr', mbprId, { context: 'Deleted an addendum' })
    }

    return response
}
