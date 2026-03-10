import { StepAddendumType } from "./stepAddendumType"

export interface StepAddendum {
  id: string
  stepId: string
  addendumTypeId: string
  content: string
  recordStatusId: string
  createdAt: Date
  updatedAt: Date
  addendumType: StepAddendumType
}
