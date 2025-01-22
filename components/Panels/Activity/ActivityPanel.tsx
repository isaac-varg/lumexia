import { ExActivityLog } from "@/types/activityLog";
import React from "react";
import ActivityEntry from "./ActivityEntry";
import { groupActivitiesByDate } from "@/utils/data/groupActivitiesByDate";

type ActivityPanelProps = {
	activity: ExActivityLog[];
};
const ActivityPanel = ({ activity }: ActivityPanelProps) => {
	const groupedActivities = groupActivitiesByDate(activity, "createdAt");
	return <div className="flex flex-col gap-y-3">
		{groupedActivities.map((group, index:number) => <ActivityEntry key={group.timestamp.toString()} activities={group.activities}  index={index} />)}
	</div>;
};

export default ActivityPanel;
