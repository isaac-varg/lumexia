'use server'

import prisma from "@/lib/prisma"
import { pricingExaminationStatuses } from "@/configs/staticRecords/pricingExaminationStatuses"
import { revalidatePath } from "next/cache"

export const approvePricingExamination = async (examinationId: string) => {
    const response = await prisma.pricingExamination.update({
        where: {
            id: examinationId,
        },
        data: {
            statusId: pricingExaminationStatuses.approved,
        }
    });

    revalidatePath('/accounting/pricing/details')

    return response
}
