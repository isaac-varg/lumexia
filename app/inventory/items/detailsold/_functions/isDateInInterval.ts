import { DateTime, Interval } from "luxon";

export const isDateInInterval = (start: DateTime, end: DateTime, dateToCheck: DateTime) => {
	const interval = Interval.fromDateTimes(start, end);

	return interval.contains(dateToCheck);


}
