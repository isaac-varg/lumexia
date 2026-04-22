"use server"

import { getUserId } from "@/actions/users/getUserId"
import { pricingExaminationStatuses } from "@/configs/staticRecords/pricingExaminationStatuses"
import prisma from "@/lib/prisma"

export const createExamination = async (examinedItemId: string, examinationId?: string,) => {

    const userId = await getUserId()

    // Delete any existing queued examinations for this item,
    // cascading through note files and notes first to avoid foreign key constraints
    const queuedExams = await prisma.pricingExamination.findMany({
        where: {
            examinedItemId,
            statusId: pricingExaminationStatuses.queued,
        },
        select: { id: true },
    });

    if (queuedExams.length > 0) {
        const queuedExamIds = queuedExams.map((e) => e.id);

        // Delete note files → notes → examinations (respecting FK order)
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
