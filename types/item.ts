import { ItemType } from "./itemType"
import { ProcurementType } from "./procurementType"
import { InventoryType } from "./inventoryType"
import { Alias } from "./alias"
import { Lot } from "./lot"

export interface Item {
  id: string
  name: string
  referenceCode: string
  itemTypeId: string
  procurementTypeId: string
  inventoryTypeId: string
  createdAt?: string | Date
  updatedAt?: string | Date
  itemType?: ItemType
  procurementType?: ProcurementType
  inventoryType?: InventoryType
  aliases?: Alias[]
  lots?: Lot[]

}

