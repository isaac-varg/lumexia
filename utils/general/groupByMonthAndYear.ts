import { DateTime } from "luxon";

export const groupByMonthAndYear = (data: any[]) => {
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

