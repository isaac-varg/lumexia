import { Item } from "./item"

export interface BillOfMaterials {
  id: string
  itemId: string
  mbprId: string
  stepId: string
  identifier: string
  concentration: number
  createdAt: Date
  updatedAt: Date

}


export interface ExBillOfMaterials extends BillOfMaterials {
  item: Item
}
