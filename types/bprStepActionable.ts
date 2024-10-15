import { BprBatchStep } from "./bprBatchStep"
import { StepActionable } from "./stepActionable"
import { User } from "./user"

export interface BprStepActionable {
    id: string
    bprBatchStepId: string
    batchStepActionableId: string
    statusId: String
    createdAt: Date
    updatedAt: Date
    isCompounded: boolean
    isVerified: boolean
    isSecondarilyVerified: boolean
} 

export interface ExBprStepActionable extends BprStepActionable {
    bprBatchStep: BprBatchStep
    stepActionable: StepActionable
}
