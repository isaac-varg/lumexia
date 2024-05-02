import { ContainerType } from "./containerType"
import { Lot } from "./lot"
import { Uom } from "./uom"

export interface Container {
    id: string
    lotId: string
    containerTypeId: string
    containerWeight: number
    uomId: string
    createdAt: string | Date
    updatedAt: string | Date
    lot: Lot
    containerType: ContainerType
    uom: Uom
}