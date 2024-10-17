import { User } from "./user"

export interface BprStepActionableCompletion {
    id: string
    completedByUserId: string
    bprStepActionableId: string
    value: string
    createdAt: Date
    updatedAt: Date
    completedByUser: User
}
