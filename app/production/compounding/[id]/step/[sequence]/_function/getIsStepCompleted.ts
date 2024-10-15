import { ExBprStepActionable } from "@/types/bprStepActionable";

export const getIsStepCompleted = (stepActionables: ExBprStepActionable[]) => {
    
   
    const isStepCompleted = stepActionables.every((step) => step.isCompounded == true);


    return isStepCompleted


}
