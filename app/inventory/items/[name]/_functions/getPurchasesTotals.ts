import { Item } from "@prisma/client";

export const getPurchasesTotals = (data: any[], item: Item) => {
	const supplierTotals = data.reduce((acc, curr) => {
		const supplierId = curr.supplierId;
		const poItem =
			curr.purchaseOrderItems[
			curr.purchaseOrderItems.findIndex(
				(lineItem: any) => lineItem.itemId === item.id,
			)
			];
		if (acc[supplierId]) {
			console.log(curr);
			acc[supplierId].count = acc[supplierId].count + 1;
			acc[supplierId].totalQuantity += poItem.quantity;
		} else {
			acc[supplierId] = {};
			acc[supplierId].count = 1;
			acc[supplierId].totalQuantity = poItem.quantity;
			acc[supplierId].name = curr.supplier.name;
		}
		return acc;
	}, {});

	//	const flattened = Object.entries(supplierTotals).map(([key, value]) => {
	//		return [key, value.name, value.count, value.totalQuantity]
	//	});

	return supplierTotals;
};
