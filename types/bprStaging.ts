import { ExBprBom } from "./bprBom"
import { BprStagingStatus } from "./bprStagingStatus"
import { Lot } from "./lot"
import { Uom } from "./uom"
import { User } from "./user"

export interface BprStaging {
 id: string
 bprBomId: string
 lotId: string
 pulledByUserId: string
 quantity: number
 uomId: string
 bprStagingStatusId: string
}

export interface ExBprStaging extends BprStaging {
 bprBom: ExBprBom 
 lot: Lot
 pulledByUser: User
 uom: Uom
 status: BprStagingStatus
}
