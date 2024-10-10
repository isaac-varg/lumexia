"use server"

import { ExBprBatchStep } from "@/types/bprBatchStep"

// the current step is defined as
// the first bprBatchStep that 
//          isCompleted = false
//          at least one required associated bprStepActionables isComplete = false


export const getCurrentStep = async (batchSteps: ExBprBatchStep[]) => {

    return batchSteps.find(step =>
        !step.isComplete &&
        step.bprStepActionables.some(actionable => !actionable.isComplete)
    );
}

