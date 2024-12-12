"use server"

import bprStatusActions from "@/actions/production/bprStatuses"
import prisma from "@/lib/prisma";

export const getBprStatuses = async () => {
    const statuses = await prisma.bprStatus.findMany({
        orderBy: {
            sequence: 'asc'
        }
    })

    return statuses;
}
