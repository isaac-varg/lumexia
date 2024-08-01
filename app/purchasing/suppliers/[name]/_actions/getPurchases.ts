"use server";

import purchaseOrderActions from "@/actions/purchasing/purchaseOrderActions";
import { PurchaseOrder } from "@/types/purchaseOrder";
import { ExPurchaseOrderItem, PurchaseOrderItem } from "@/types/purchaseOrderItem";

interface LineItems extends ExPurchaseOrderItem {
	total: number,
}

export interface SupplierDetailPurchases extends PurchaseOrder {
	lineItems: LineItems[] 
	total: number
}

export const getPurchases = async (supplierId: string) => {
	const purchases = await purchaseOrderActions.getAll({ supplierId }, [
		"purchaseOrderItems",
	]);

	const extended: SupplierDetailPurchases[] = purchases.map((purchase: PurchaseOrder) => {
		const { purchaseOrderItems, ...rest } = purchase;
		const lineItems = purchase.purchaseOrderItems?.map(
			(lineItem: PurchaseOrderItem) => {
				const total = lineItem.quantity * lineItem.pricePerUnit;

				return {
					...lineItem,
					total,
				};
			},
			0,
		);

		const total = lineItems?.reduce((purchaseTotal: number, lineItem: any) => {
			return purchaseTotal + lineItem.total;
		}, 0);

		return {
			...rest,
			lineItems,
			total,
		};
	});


	return extended;
};
