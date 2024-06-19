import { Item } from "./item";
import { PurchaseOrderStatus } from "./purchaseOrderStatus";
import { Uom } from "./uom";

export interface PurchaseOrderItem {
	id: string;
	purchaseOrderId: string;
	quantity: number;
	pricePerUnit: number;
	uomId: string;
	purchaseOrderStatusId: string;
	itemId: string;
	item: Item;
	createdAt: Date;
	updatedAt: Date;
	purchaseOrderStatus: PurchaseOrderStatus;
	uom: Uom;
}
