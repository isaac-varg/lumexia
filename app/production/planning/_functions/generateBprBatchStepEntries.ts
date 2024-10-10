"use server"

import batchStepActions from "@/actions/production/batchSteps"
import bprActions from "@/actions/production/bprActions";
import bprBatchStepActions from "@/actions/production/bprBatchSteps";
import bprStepActionableActions from "@/actions/production/bprStepActionables";
import stepActionableActions from "@/actions/production/stepActionables";
import { BatchProductionRecord } from "@/types/batchProductionRecord";
import { BatchStep } from "@/types/batchStep"
import { StepActionable } from "@/types/stepActionable";

export const generateBprBatchStepEntries = async (bprId: string) => {

    const bpr: BatchProductionRecord = await bprActions.getOne(bprId);
    const batchSteps = await batchStepActions.getAll({ mbprId: bpr.mbprId })
    
    console.log('batchSteps', batchSteps)

    batchSteps.forEach(async (step: BatchStep) => {

        const bprBatchStep = await createBprBatchStep(step.id, bpr.id);
        const stepActionables = await stepActionableActions.getAll({ stepId: step.id });

        console.log("stepActionables", stepActionables)


        stepActionables.forEach(async (actionable: StepActionable) => {

            console.log("bprbatchstep", bprBatchStep)

            await createBprStepActionable(bprBatchStep.id, actionable.id);

        })
    })

}


const createBprBatchStep = async (batchStepId: string, bprId: string) => {

    const payload = {
        batchStepId,
        bprId,
        isComplete: false,
    }
    const bprBatchStep = await bprBatchStepActions.createNew(payload);

    return bprBatchStep;
}

const createBprStepActionable = async (bprBatchStepId: string, batchStepActionableId: string) => {

    const payload = {
        bprBatchStepId,
        batchStepActionableId,
        isComplete: false,
    };

    console.log("payload", payload)

    await bprStepActionableActions.createNew(payload);

}
