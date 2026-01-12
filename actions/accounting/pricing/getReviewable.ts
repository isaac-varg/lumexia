"use server"

import { pricingExaminationStatuses } from "@/configs/staticRecords/pricingExaminationStatuses";
import prisma from "@/lib/prisma"

export const getReviewablePricingExams = async () => {
  const exams = await prisma.pricingExamination.findMany({
    where: {
      statusId: pricingExaminationStatuses.queued,
    },
    include: {
      examinedItem: true,
      user: true,
    }
  });

  return exams
}

export type ReviewablePricingExams = Awaited<ReturnType<typeof getReviewablePricingExams>>[number]
