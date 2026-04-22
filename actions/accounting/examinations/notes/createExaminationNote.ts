"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { getUserId } from "@/actions/users/getUserId"
import { pricingExaminationStatuses } from "@/configs/staticRecords/pricingExaminationStatuses"
import { createNoteFiles } from "@/actions/notes/createNoteFiles"


export const createExaminationNote = async (data: Prisma.PricingExaminationNoteUncheckedCreateInput, examinationData: { examinationId: string, examinedItemId: string }, fileIds: string[] = []) => {

    const userId = await getUserId()


    let examination = await prisma.pricingExamination.findUnique({
        where: {
            id: examinationData.examinationId,
        }
    })

    if (!examination) {
        // Delete any existing queued examinations for this item,
        // cascading through note files and notes first to avoid foreign key constraints
        const queuedExams = await prisma.pricingExamination.findMany({
            where: {
                examinedItemId: examinationData.examinedItemId,
                statusId: pricingExaminationStatuses.queued,
            },
            select: { id: true },
        });

        if (queuedExams.length > 0) {
            const queuedExamIds = queuedExams.map((e) => e.id);

            await prisma.pricingExaminationNoteFile.deleteMany({
                where: {
                    pricingExaminationNote: {
                        pricingExaminationId: { in: queuedExamIds },
                    },
                },
            });
            await prisma.pricingExaminationNote.deleteMany({
                where: {
                    pricingExaminationId: { in: queuedExamIds },
                },
            });
            await prisma.pricingExamination.deleteMany({
                where: {
                    id: { in: queuedExamIds },
                },
            });
        }

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
    await createNoteFiles('pricingExaminationNoteFile', response.id, fileIds)

    return response;
}
