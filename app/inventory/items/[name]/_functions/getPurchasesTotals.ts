import { Item } from "@/types/item";
import { FlattenedPurchaseOrder } from "./flattenPurchaseOrder";

export type SupplierTotals = {
	name: string;
	purchaseOrders: {
		id: string;
		referenceCode: number;
		createdAt: Date;
		pricePerUnit: number;
		quantity: number;
	}[];
	supplierId: string;
};

export const getPurchasesTotals = (
	data: FlattenedPurchaseOrder[],
	item: Item,
): SupplierTotals[] => {

	const supplierTotals: SupplierTotals[] = data.reduce(
		(acc: SupplierTotals[], curr: FlattenedPurchaseOrder) => {
			// gets all the matching items for the po
			// necessary because of how we handle partially deliveries (line item is split from what was received and what remains to be delivered)
			const itemsFromPO = curr.purchaseOrderItems.filter(
				(lineItem) => lineItem.itemId === item.id,
			);

			// item dne in po
			if (itemsFromPO.length === 0) {
				return acc;
			}

			// get the totals for the line items for the matching product
			// e.g., if it was split sum them too not just pull the first occurence
			const sumOfQuantity = itemsFromPO.reduce(
				(total: number, curr) => curr.quantity + total,
				0,
			);
			// this is just the price per unit from the first occurence, it will be the same regardless if it was partially receive
			// i.e., an item does not have multiple prices in one single po
			const priceForItem = itemsFromPO[0].pricePerUnit;

			const {
				id: purchaseOrderId,
				supplierId,
				supplierName,
				createdAt,
				referenceCode,
			} = curr;

			const supplierIndexInAccumulator = acc.findIndex(
				(supplier: SupplierTotals) => supplier.supplierId === supplierId,
			);

			if (supplierIndexInAccumulator >= 0) {
				acc[supplierIndexInAccumulator].purchaseOrders.push({
					id: purchaseOrderId,
					referenceCode: referenceCode,
					createdAt: createdAt,
					pricePerUnit: priceForItem,
					quantity: sumOfQuantity,
				});
				return acc;
			}

			return [
				...acc,
				{
					name: supplierName,
					supplierId: supplierId,
					purchaseOrders: [
						{
							id: purchaseOrderId,
							referenceCode: referenceCode,
							createdAt: createdAt,
							pricePerUnit: priceForItem,
							quantity: sumOfQuantity,
						},
					],
				},
			];
		},
		[],
	);

	return supplierTotals;
};
