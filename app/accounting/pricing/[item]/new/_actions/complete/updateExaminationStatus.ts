'use server'

import { pricingExaminationStatuses } from "@/configs/staticRecords/pricingExaminationStatuses"
import prisma from "@/lib/prisma"

export const updateExaminationStatus = async (examinationId: string) => {
  await prisma.pricingExamination.update({
    where: {
      id: examinationId
    },
    data: {
      statusId: pricingExaminationStatuses.pendingReview
    }
  })
}
