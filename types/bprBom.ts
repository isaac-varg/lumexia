import { BillOfMaterials } from "./billOfMaterials"
import { MasterBatchProductionRecord } from "./masterBatchProductionRecord"
import { Uom } from "./uom"

export interface BprBom {
  id: string
  bprId: string
  bomId: string
  quantity: number
  uomId: string
  createdAt: Date
  updatedAt: Date

  bpr:  MasterBatchProductionRecord
  bom: BillOfMaterials
  uom: Uom

}
