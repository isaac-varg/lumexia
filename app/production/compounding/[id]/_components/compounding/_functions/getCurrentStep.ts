"use server"

import { bprBatchStepStatuses } from "@/configs/staticRecords/bprBatchStepStatuses";
import { ExBprBatchStep } from "@/types/bprBatchStep"

// the current step is defined as
// the first bprBatchStep that 
//          status is fulfillStep 
//          at least one required associated bprStepActionables isCompounded = false


export const getCurrentStep = async (batchSteps: ExBprBatchStep[]) => {

  return batchSteps.find(step =>
    step.statusId === bprBatchStepStatuses.fulfillStep &&
    step.bprStepActionables.some(actionable => !actionable.isCompounded)
  );


}

