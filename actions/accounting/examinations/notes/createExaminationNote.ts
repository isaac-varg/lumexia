"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { getUserId } from "@/actions/users/getUserId"
import { pricingExaminationStatuses } from "@/configs/staticRecords/pricingExaminationStatuses"


export const createExaminationNote = async (data: Prisma.PricingExaminationNoteUncheckedCreateInput, examinationData: { examinationId: string, examinedItemId: string }) => {

    const userId = await getUserId()


    let examination = await prisma.pricingExamination.findUnique({
        where: {
            id: examinationData.examinationId,
        }
    })

    if (!examination) {
        // Delete any existing queued examinations for this item
        await prisma.pricingExamination.deleteMany({
            where: {
                examinedItemId: examinationData.examinedItemId,
                statusId: pricingExaminationStatuses.queued,
            },
        });

        const examinationResponse = await prisma.pricingExamination.create({
            data: {
                id: examinationData.examinationId,
                examinedItemId: examinationData.examinedItemId,
                userId,
                statusId: pricingExaminationStatuses.queued,
            }
        })

        examination = examinationResponse;
    }

    const payload: Prisma.PricingExaminationNoteUncheckedCreateInput = {
        ...data,
        pricingExaminationId: examination.id,
    }
    const response = await prisma.pricingExaminationNote.create({
        data: payload,

    })

    return response;
}
