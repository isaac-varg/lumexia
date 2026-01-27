"use server"

import { getUserId } from "@/actions/users/getUserId"
import { pricingExaminationStatuses } from "@/configs/staticRecords/pricingExaminationStatuses"
import prisma from "@/lib/prisma"

export const createExamination = async (examinedItemId: string, examinationId?: string,) => {

    const userId = await getUserId()

    // Delete any existing queued examinations for this item
    await prisma.pricingExamination.deleteMany({
        where: {
            examinedItemId,
            statusId: pricingExaminationStatuses.queued,
        },
    });

    const payload = {
        userId,
        examinedItemId,
        statusId: pricingExaminationStatuses.queued,
        ...(examinationId && { id: examinationId, })
    }

    const response = await prisma.pricingExamination.create({
        data: payload,
    })

    return response;

}
