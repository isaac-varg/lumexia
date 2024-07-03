// this grouped activity logs by date ("July 08 2050") 
// so that the activities for a single day can be worked with

import { ExActivityLog } from "@/types/activityLog";
import { DateTime } from "luxon";

type GroupedActivities = {
	timestamp: Date | string;
	activities: ExActivityLog[];
}

export const groupActivitiesByDate = (activities: ExActivityLog[], timestampType: 'createdAt' | 'updatedAt'): GroupedActivities[] => {
	return activities.reduce((acc, activity) => {
		const timestamp = DateTime.fromJSDate(activity[timestampType]).toFormat("DD");
		
		const indexInAcc = acc.findIndex(date => date.timestamp === timestamp);

		if (indexInAcc < 0) {
			acc.push({ timestamp, activities: [activity] });
		} else {
			acc[indexInAcc].activities.push(activity);
		}

		return acc;
	}, [] as GroupedActivities[]);
};

