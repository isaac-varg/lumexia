import { Item } from "./item"

export interface BillOfMaterials {
  id: string
  itemId: string
  mbprId: string
  stepId: string
  identifier: string
  concentration: number
  recordStatusId: string
  createdAt: Date
  updatedAt: Date

}


export interface ExBillOfMaterials extends BillOfMaterials {
  item: Item
}
