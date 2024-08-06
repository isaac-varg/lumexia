// used for getting the date ranges for the all last year year to date buttons for metrics

import { DateTime } from "luxon";

export const getModeDates = (mode: "yearToDate" | "lastYear" | "all"
) => {
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

  return {
    start,
    end,
  }

}
