import { Item } from "./item"
import { RecordStatus } from "./recordStatus"

export interface MasterBatchProductionRecord {
  id: string
  producesItemId: string
  recordStatusId: string
  versionLabel?: string | null
  estimatedTotalTime?: number | null
  createdAt: Date
  updatedAt: Date
  recordStatus?: RecordStatus
}

export interface ExMbpr extends MasterBatchProductionRecord {
  producesItem: Item
}
