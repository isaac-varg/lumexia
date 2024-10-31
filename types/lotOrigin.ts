import { BatchProductionRecord } from "./batchProductionRecord"
import { Lot } from "./lot"
import { PurchaseOrder } from "./purchaseOrder"

export interface LotOrigin {
	id: string
	lotId: string
    bprId?: string
	purchaseOrderId?: string
	originType: string
	qr: string
	lot?: Lot
    bpr?: BatchProductionRecord
    purchaseOrder?: PurchaseOrder
}
