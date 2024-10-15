import { ExBprBatchStep } from "@/types/bprBatchStep";
import { ExBprStepActionable } from "@/types/bprStepActionable";

// locked is defined as 
//      the previous step has
//              actionables that require verification
//              and isVerified is false


export const isCurrentStepLocked = async (sortedBprBatchSteps : ExBprBatchStep[], currentStepSequence: number) => {

    const previousStep = sortedBprBatchSteps.find((step) => step.batchStep.sequence === (currentStepSequence - 1));
    
    if (!previousStep) {return false}

    // regards to previouus step
    const requiresVerification = previousStep.bprStepActionables.some((actionable: any) => actionable.stepActionable.verificationRequired === true)
    const allVerified = previousStep.bprStepActionables.every((actionable) => actionable.isVerified)

    if (requiresVerification && !allVerified) {
        return true;
     }

     return false 

}
