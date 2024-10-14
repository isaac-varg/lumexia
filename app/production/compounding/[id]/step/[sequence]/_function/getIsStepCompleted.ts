import { ExBprStepActionable } from "@/types/bprStepActionable";

export const getIsStepCompleted = (stepActionables: ExBprStepActionable[]) => {
    
    console.log(stepActionables)
   
    const isStepCompleted = stepActionables.every((step) => step.isComplete == true);

    console.log(isStepCompleted)

    return isStepCompleted


}
