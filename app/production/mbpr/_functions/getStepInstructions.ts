"use server"

import stepInstructionActions from "@/actions/production/stepInstructions"

export const getStepInstructions = async (stepId: string) => {

  const data = await stepInstructionActions.getAll({ stepId })

  return data;

}
