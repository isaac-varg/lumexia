import { BatchSize } from "./batchSize"
import { BprStatus } from "./bprStatus"
import { MasterBatchProductionRecord } from "./masterBatchProductionRecord"

export interface BatchProductionRecord {
  id: string
  mbprId: string
  bprStatusId: string
  batchSizeId: string
  scheduledAt: Date
  completedAt: Date
  releasedAt: Date
  referenceCode: number

  mbpr: MasterBatchProductionRecord
  bprStatus: BprStatus
  batchSize: BatchSize
}
