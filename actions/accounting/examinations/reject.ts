'use server'

import prisma from "@/lib/prisma"
import { pricingExaminationStatuses } from "@/configs/staticRecords/pricingExaminationStatuses"
import { revalidatePath } from "next/cache"
import { getUserId } from "@/actions/users/getUserId"

export const rejectPricingExamination = async (examinationId: string) => {
    const userId = await getUserId()

    // Get the current examination with its notes
    const currentExam = await prisma.pricingExamination.findUniqueOrThrow({
        where: { id: examinationId },
        include: {
            PricingExaminationNote: true,
        }
    })

    // Update the current examination status to rejected
    await prisma.pricingExamination.update({
        where: { id: examinationId },
        data: {
            statusId: pricingExaminationStatuses.rejected,
        }
    })

    // Create a new examination for the same item with queued status
    const newExam = await prisma.pricingExamination.create({
        data: {
            examinedItemId: currentExam.examinedItemId,
            userId,
            statusId: pricingExaminationStatuses.queued,
        }
    })

    // Copy notes from rejected examination to the new one
    if (currentExam.PricingExaminationNote.length > 0) {
        await prisma.pricingExaminationNote.createMany({
            data: currentExam.PricingExaminationNote.map(note => ({
                pricingExaminationId: newExam.id,
                noteTypeId: note.noteTypeId,
                userId: note.userId,
                content: note.content,
            }))
        })
    }

    revalidatePath('/accounting/pricing/details')
    revalidatePath('/accounting/pricing')

    return { rejectedExam: currentExam, newExam }
}
