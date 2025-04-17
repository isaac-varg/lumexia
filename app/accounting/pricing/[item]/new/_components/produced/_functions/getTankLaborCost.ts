'use server'

import prisma from "@/lib/prisma"

export const getTankLaborCost = async () => {
    const response = await prisma.config.findFirst({
        where: {
            id: 'b3474654-d309-4259-9e28-f0e6fb57f593'
        },
    });

    return response;
}
