import { BatchSize } from "./batchSize"
import { BprStatus } from "./bprStatus"
import { LotOrigin } from "./lotOrigin"
import { ExMbpr, MasterBatchProductionRecord } from "./masterBatchProductionRecord"

export interface BatchProductionRecord {
    id: string
    mbprId: string
    bprStatusId: string
    batchSizeId: string
    scheduledForStart?: Date | null
    scheduledForEnd?: Date | null
    completedAt?: Date | null
    releasedAt?: Date | null
    referenceCode: number

    mbpr: ExMbpr
    status: BprStatus
    batchSize: BatchSize
    lotOrigin: LotOrigin[]
}


// make this alternative one to fix some type issues. 
// TODO go through and fix references to old interface above

export interface IBpr {
    id: string
    mbprId: string
    bprStatusId: string
    batchSizeId: string
    scheduledForStart?: Date | null
    scheduledForEnd?: Date | null
    completedAt?: Date | null
    releasedAt?: Date | null
    referenceCode: number
}





