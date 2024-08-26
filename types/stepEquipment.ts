import { BatchStep } from "./batchStep"
import { Equipment } from "./equipment"

export interface StepEquipment {
  id: string
  stepId: string
  equipmentId: string
  createdAt: Date
  updatedAt: Date
  equipment: Equipment
  step: BatchStep
   
}
