import { ActionableType } from "./actionableType"

export interface StepActionable {
  id: string
  stepId: string
  actionableTypeId: string
  required: boolean
  verificationRequired: boolean
  secondaryVerificationRequired: boolean
  createdAt: Date
  updatedAt: Date
  
  actionableType: ActionableType

}
