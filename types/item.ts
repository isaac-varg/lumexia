import { ItemType } from "@prisma/client"
import { ProcurementType } from "./procurementType"
import { InventoryType } from "./inventoryType"

export interface Item {
    id?: string
    name: string
    referenceCode: string
    itemTypeId: string
    procurementTypeId: string
    inventoryTypeId: string
    createdAt?: string
    updatedAt?: string
    itemType?: ItemType
    procurementType?: ProcurementType
    inventoryType?: InventoryType
}