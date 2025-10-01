"use server"

import batchStepActions from "@/actions/production/batchSteps"
import bprActions from "@/actions/production/bprActions";
import bprBatchStepActions from "@/actions/production/bprBatchSteps";
import bprStepActionableActions from "@/actions/production/bprStepActionables";
import stepActionableActions from "@/actions/production/stepActionables";
import { bprBatchStepStatuses } from "@/configs/staticRecords/bprBatchStepStatuses";
import { bprStepActionableStatuses } from "@/configs/staticRecords/bprStepActionableStatuses";
import { BatchProductionRecord } from "@/types/batchProductionRecord";
import { BatchStep } from "@/types/batchStep"
import { StepActionable } from "@/types/stepActionable";

export const generateBprBatchStepEntries = async (bprId: string) => {

  const bpr: BatchProductionRecord = await bprActions.getOne(bprId);
  const batchSteps = await batchStepActions.getAll({ mbprId: bpr.mbprId })


  batchSteps.forEach(async (step: BatchStep) => {

    const bprBatchStep = await createBprBatchStep(step.id, bpr.id);
    const stepActionables = await stepActionableActions.getAll({ stepId: step.id });

    stepActionables.forEach(async (actionable: StepActionable) => {


      await createBprStepActionable(bprBatchStep.id, actionable.id);

    })
  })

}


const createBprBatchStep = async (batchStepId: string, bprId: string) => {

  const payload = {
    batchStepId,
    bprId,
    isComplete: false,
    statusId: bprBatchStepStatuses.fulfillStep,
  }
  const bprBatchStep = await bprBatchStepActions.createNew(payload);

  return bprBatchStep;
}

const createBprStepActionable = async (bprBatchStepId: string, batchStepActionableId: string) => {

  const payload = {
    bprBatchStepId,
    batchStepActionableId,
    isCompounded: false,
    isVerified: false,
    isSecondarilyVerified: false,
    statusId: bprStepActionableStatuses.compounding,
  };


  await bprStepActionableActions.createNew(payload);

}
