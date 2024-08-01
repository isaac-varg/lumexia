import { DateTime } from "luxon";
import { SupplierDetailPurchases } from "./getPurchases";

const groupByMonthAndYear = (data: any[]) => {
	return data.reduce((acc, entry) => {
		const date = DateTime.fromJSDate(new Date(entry.createdAt)); // Ensure entry.createdAt is converted to a Date object if it's a string
		const year = date.toFormat("yyyy");
		const month = date.toFormat("MMM");

		if (!acc[year]) {
			acc[year] = {};
		}

		if (!acc[year][month]) {
			acc[year][month] = [];
		}

		acc[year][month].push(entry);
		return acc;
	}, {});
};

export const getPurchasesChartData = (purchases: SupplierDetailPurchases[]) => {
	const grouped = groupByMonthAndYear(purchases);

	return Object.keys(grouped).map((yearGroup: string) => {
		const data = Object.keys(grouped[yearGroup]).map((month: string) => {
			return { x: month, y: grouped[yearGroup][month].length };
		});

		return {
			name: yearGroup,
			data,
		};
	});
};
