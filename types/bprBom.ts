import { Omit } from "@prisma/client/runtime/library"
import { BillOfMaterials, ExBillOfMaterials } from "./billOfMaterials"
import { BprStagingStatus } from "./bprStagingStatus"
import { Uom } from "./uom"
import { BatchProductionRecord } from "./batchProductionRecord"

export interface BprBom {
  id: string
  bprId: string
  bomId: string
  quantity: number
  statusId: string
  uomId: string
  createdAt: Date
  updatedAt: Date

  bpr: BatchProductionRecord 
  bom: BillOfMaterials
  uom: Uom


}


export interface ExBprBom extends Omit<BprBom, 'bom' > {
  status: BprStagingStatus;
  bom: ExBillOfMaterials; 
}
