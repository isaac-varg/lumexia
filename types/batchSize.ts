import { RecordStatus } from "./recordStatus"
import { MasterBatchProductionRecord } from "./masterBatchProductionRecord"
import { Uom } from "./uom"

export interface BatchSize {
  id: string
  mbprId: string
  quantity: number
  uomId: string
  recordStatusId: string
  createdAt: Date
  updatedAt: Date
  uom: Uom 
  status: RecordStatus
  mbpr: MasterBatchProductionRecord
}
