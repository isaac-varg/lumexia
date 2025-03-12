"use server"

import { getUserId } from "@/actions/users/getUserId"
import prisma from "@/lib/prisma"

export const createExamination = async (examinedItemId: string, examinationId?: string,) => {

    const userId = await getUserId()

    const payload = {
        userId,
        examinedItemId,
        ...(examinationId && { id: examinationId, })
    }

    const response = await prisma.pricingExamination.create({
        data: payload,
    })

    return response;

}
