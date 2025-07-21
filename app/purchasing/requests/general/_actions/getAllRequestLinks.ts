'use server'

import prisma from "@/lib/prisma"

export const getAllRequestLinks = async (generalRequestId: string) => {
    const links = prisma.generalRequestLink.findMany({
        where: {
            generalRequestId,
        },
        include: {
            purchasingRequest: {
                include: {
                    item: true,
                    status: true,
                    priority: true,
                    requestingUser: true
                }
            }
        }
    });

    return links;
}

export type RequestLink = Awaited<ReturnType<typeof getAllRequestLinks>>[number]
