"use server"

import { revalidatePage } from "@/actions/app/revalidatePage"
import prisma from "@/lib/prisma"

export const createLinkedPo = async (data: {
    requestId: string,
    poId: string,
}) => {

    const response = await prisma.requestPurchaseOrder.create({
        data,
    })

    revalidatePage("/purchasing/request/[referenceCode]/")

    return response;
}
