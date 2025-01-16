"use server"

import prisma from "@/lib/prisma"
import { PurchasingRequest } from "@/types/purchasingRequest"
import { User } from "@/types/user"

export interface RequestDetails extends PurchasingRequest {
    requestingUser: User 
}

export const getRequest = async (id: string) => {

    const response = await prisma.purchasingRequest.findFirstOrThrow({
        where: {
            id,
        },
        include: {
            status: true,
            priority: true,
            item: true,
            requestingUser: true
        }
    })

    return response
}
