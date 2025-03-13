'use server'
import { getUserId } from "@/actions/users/getUserId"
import prisma from "@/lib/prisma"

export const upsertPricingExamination = async (examinationId: string, examinedItemId: string) => {
    
    const userId = await getUserId()
    const response = await prisma.pricingExamination.upsert({
        where: {
            id: examinationId,
        },
        create: {
            id: examinationId,
            examinedItemId,
            userId,
        },
        update: {}
    });

    return response
}
