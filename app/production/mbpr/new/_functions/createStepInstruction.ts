"use server"

import stepInstructionActions from "@/actions/production/stepInstructions"

type Payload = {
  stepId: string
  instructionContent: string
}

export const createStepInstruction = async (payload: Payload) => {

  const response = await stepInstructionActions.createNew(payload)

  return response

}
