"use server"

import { revalidatePage } from "@/actions/app/revalidatePage"
import prisma from "@/lib/prisma"

export const createLinkedBpr = async (data: {
    requestId: string,
    bprId: string,
}) => {

    const response = await prisma.requestBpr.create({
        data,
    })

    revalidatePage("/purchasing/request/[referenceCode]/")

    return response;
}
