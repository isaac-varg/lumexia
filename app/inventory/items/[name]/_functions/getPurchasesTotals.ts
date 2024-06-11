export const getPurchasesTotals = (data: any[]) => {
	const supplierTotals = data.reduce((acc, curr) => {
		const supplierId = curr.supplierId;
		if (acc[supplierId]) {
			acc[supplierId].count = acc[supplierId].count + 1;
			acc[supplierId].totalQuantity += 500;
		} else {
			acc[supplierId] = {};
			acc[supplierId].count = 1;
			acc[supplierId].totalQuantity = 400;
			acc[supplierId].name = curr.supplier.name;
		}
		return acc;
	}, {});

	const flattened = Object.entries(supplierTotals).map(([key, value]) => {
		return [key, value.name, value.count, value.totalQuantity]
	});

	return flattened	
};
