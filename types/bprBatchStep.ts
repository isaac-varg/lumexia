import { BatchProductionRecord } from "./batchProductionRecord"
import { BatchStep } from "./batchStep"
import { BprStepActionable, ExBprStepActionable } from "./bprStepActionable"

export interface BprBatchStep {
    id: string
    batchStepId: string
    bprId: string
    completedAt: Date 
    isComplete: Boolean
    statusId: string
    createdAt: Date
    updatedAt: Date
}

export interface ExBprBatchStep extends BprBatchStep {
    batchStep: BatchStep
    bpr: BatchProductionRecord
    bprStepActionables: BprStepActionable[] | ExBprStepActionable[]
} 
