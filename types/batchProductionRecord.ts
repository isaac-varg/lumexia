import { BatchSize } from "./batchSize"
import { BprStatus } from "./bprStatus"
import { ExMbpr, MasterBatchProductionRecord } from "./masterBatchProductionRecord"

export interface BatchProductionRecord {
  id: string
  mbprId: string
  bprStatusId: string
  batchSizeId: string
  scheduledAt: Date
  completedAt: Date
  releasedAt: Date
  referenceCode: number

  mbpr: ExMbpr
  bprStatus: BprStatus
  batchSize: BatchSize
}


