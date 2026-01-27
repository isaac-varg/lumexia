"use server"

import prisma from "@/lib/prisma"
import { pricingExaminationStatuses } from "@/configs/staticRecords/pricingExaminationStatuses"
import { getUserId } from "@/actions/users/getUserId"

interface CreateQueueInput {
    itemId: string
    isCompleted?: boolean
}

export const createPricingQueue = async (data: CreateQueueInput) => {

    const userId = await getUserId()

    const response = await prisma.pricingExamination.create({
        data: {
            examinedItemId: data.itemId,
            userId,
            statusId: pricingExaminationStatuses.queued,
        },
    });

    return response
};
