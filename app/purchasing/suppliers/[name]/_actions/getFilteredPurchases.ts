import { DateTime } from "luxon";
import { SupplierDetailPurchases } from "./getPurchases";
import { isDateInInterval } from "@/utils/general/isDateInInterval";

export interface SupplierDetailsFilteredPurchases {
	filteredPurchases: SupplierDetailPurchases[];
	totalSpent: number;
}

export const getFilteredPurchases = (
	purchases: SupplierDetailPurchases[],
	mode: "yearToDate" | "lastYear" | "all",
): SupplierDetailsFilteredPurchases => {
	const currentDate = DateTime.now();
	let start: DateTime;
	let end: DateTime;

	switch (mode) {
		case "yearToDate":
			start = DateTime.local(currentDate.year, 1, 1);
			end = currentDate;
			break;
		case "lastYear":
			start = DateTime.local(currentDate.minus({ years: 1 }).year, 1, 1);
			end = DateTime.local(currentDate.minus({ years: 1 }).year, 12, 31);
			break;
		case "all":
			start = DateTime.local(1970, 1, 1); //arbitrary dates to encompasses all
			end = DateTime.local(9999, 12, 31);
			break;
		default:
			throw new Error("Invalid mode");
	}

	const filteredPurchases = purchases.filter((purchase) => {
		const createdAt = DateTime.fromJSDate(purchase.createdAt);
		return isDateInInterval(start, end, createdAt);
	});

	const totalSpent = filteredPurchases.reduce((total, purchase) => {
		return total + purchase.total;
	}, 0);

	const data = {
		filteredPurchases,
		totalSpent,
	};

	return data;
};
