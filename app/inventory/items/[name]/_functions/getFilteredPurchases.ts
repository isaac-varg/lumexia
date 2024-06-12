import { DateTime } from "luxon";
import { isDateInInterval } from "./isDateInInterval"

export const getFilteredPurchases = (data: any[], mode: 'yearToDate' | 'lastYear' | 'all' ) => {
	
	if (mode === 'all') {
		return data;
	}
	const currentDate = DateTime.now();

	let start: DateTime;
	let end: DateTime;
	
	switch (mode) {
		case 'yearToDate':
			start = DateTime.local(currentDate.year, 1, 1);	
			end = currentDate;
			break;
		case 'lastYear':
			start = DateTime.local((currentDate.minus({ years: 1 }).year), 1, 1)
			end = DateTime.local((currentDate.minus({ years: 1 }).year), 12, 31);
			break;
		default:
			break;
	}



	const filtered = data.map(supplier => {
		const filteredPOs = supplier.purchaseOrders.filter((purchase : any) => isDateInInterval(start, end, purchase[2]))

		return {
			...supplier,
			purchaseOrders: filteredPOs,
		}
	})

	return filtered;
}
