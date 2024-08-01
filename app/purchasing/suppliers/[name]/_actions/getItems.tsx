import prisma from "@/lib/prisma";
import { Item } from "@/types/item";
import { PurchaseOrder } from "@/types/purchaseOrder";
import { Uom } from "@/types/uom";

export interface SupplierDetailsItems {
	id: string;
	purchaseOrderId: string;
	quantity: number;
	pricePerUnit: number;
	uomId: string;
	purchaseOrderStatusId: string;
	itemId: string;
	item: Item;
	createdAt: Date
	updatedAt: Date;
	uom: Uom;
	purchaseOrders: PurchaseOrder
}

export const getItems = async (supplierId: string) => {
	const items = await prisma.purchaseOrderItem.findMany({
		where: {
			purchaseOrders: {
				supplierId: supplierId,
			},
		},
		distinct: ["itemId"],
		include: {
			purchaseOrders: true,
			item: true,
			uom: true,
		},
	});

	return items ;
};
