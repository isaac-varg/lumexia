"use server"

import { ExBprBatchStep } from "@/types/bprBatchStep"

// the current step is defined as
// the first bprBatchStep that 
//          isCompleted = false
//          at least one required associated bprStepActionables isComplete = false

// TODO #activetodo make current step read only if the previous step has incomplete primary/secondary verifications

export const getCurrentStep = async (batchSteps: ExBprBatchStep[]) => {

    console.log("bsteps", batchSteps)

    return batchSteps.find(step =>
        !step.isComplete &&
        step.bprStepActionables.some(actionable => !actionable.isComplete)
    );
}

