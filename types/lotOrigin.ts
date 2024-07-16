import { Lot } from "./lot"

export interface LotOrigin {
	id: string
	lotId: string
	purchaseOrderId?: string
	originType: string
	qr: string
	lot: Lot
}
