import { BprBatchStep } from "./bprBatchStep"
import { StepActionable } from "./stepActionable"
import { User } from "./user"

export interface BprStepActionable {
    id: string
    bprBatchStepId: string
    batchStepActionableId: string
    createdAt: Date
    updatedAt: Date
    userId: string
    isComplete: boolean
} 

export interface ExBprStepActionable extends BprStepActionable {
    bprBatchStep: BprBatchStep
    user: User
    batchStepActionable: StepActionable
}
