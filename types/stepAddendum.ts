import { StepAddendumType } from "./stepAddendumType"

export interface StepAddendum {
  id: string
  stepId: string
  addendumTypeId: string
  content: string
  createdAt: Date
  updatedAt: Date
  addendumType: StepAddendumType 
}
