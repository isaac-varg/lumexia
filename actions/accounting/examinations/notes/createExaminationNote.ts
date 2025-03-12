"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { getUserId } from "@/actions/users/getUserId"


export const createExaminationNote = async (data: Prisma.PricingExaminationNoteUncheckedCreateInput, examinationData: { examinationId: string, examinedItemId: string }) => {

    const userId = await getUserId()


    let examination = await prisma.pricingExamination.findUnique({
        where: {
            id: examinationData.examinationId,
        }
    })

    if (!examination) {
        const examinationResponse = await prisma.pricingExamination.create({
            data: {
                id: examinationData.examinationId,
                examinedItemId: examinationData.examinedItemId,
                userId,
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
