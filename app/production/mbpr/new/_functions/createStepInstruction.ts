"use server"

import stepInstructionActions from "@/actions/production/stepInstructions"
import { recordStatuses } from "@/configs/staticRecords/recordStatuses"

type Payload = {
  stepId: string
  instructionContent: string
}

export const createStepInstruction = async (payload: Payload) => {

  const response = await stepInstructionActions.createNew({
    ...payload,
    recordStatusId: recordStatuses.active,
  })

  return response

}
