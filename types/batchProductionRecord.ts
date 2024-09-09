import { BatchSize } from "./batchSize"
import { BprStatus } from "./bprStatus"
import { ExMbpr, MasterBatchProductionRecord } from "./masterBatchProductionRecord"

export interface BatchProductionRecord {
  id: string
  mbprId: string
  bprStatusId: string
  batchSizeId: string
  scheduledAt?: Date | null
  completedAt?: Date | null
  releasedAt?: Date | null
  referenceCode: number

  mbpr: ExMbpr
  status: BprStatus
  batchSize: BatchSize
}


