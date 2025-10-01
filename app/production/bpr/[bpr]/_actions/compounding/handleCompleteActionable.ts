'use server'

import prisma from "@/lib/prisma"
import { ProductionStep } from "./getSteps"
import { DateTime } from "luxon"
import { staticRecords } from "@/configs/staticRecords"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"
import { bprStepActionableStatuses } from "@/configs/staticRecords/bprStepActionableStatuses"
import { bprBatchStepStatuses } from "@/configs/staticRecords/bprBatchStepStatuses"

// handles an actionable of type complete step

export const handleCompleteActionable = async (batchStep: ProductionStep, completeActionable: ProductionStep['bprStepActionables'][number]) => {


  const timestamp = DateTime.now().toJSDate()

  // ensure that all other actionables completed
  // instead i will conditionally hide the button to only show if all other actionables (that are required) are completed 

  // update bprstepactionable 
  const response = prisma.bprBatchStep.update({
    where: {
      id: batchStep.id,
    },
    data: {
      completedAt: timestamp,
      isComplete: true,
      statusId: bprBatchStepStatuses.completed,
    }
  });

  await prisma.bprStepActionable.update({
    where: {
      id: completeActionable.id
    },
    data: {
      isCompounded: true,
      statusId: bprStepActionableStatuses.completed
    }
  })

  // make note
  await createActivityLog('completeBatchStep', 'bpr', batchStep.bprId, { context: `${batchStep.batchStep.phase} ${batchStep.batchStep.label} completed` })

  return response;
}

