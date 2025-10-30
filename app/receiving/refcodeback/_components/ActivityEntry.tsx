"use client"

import { ExActivityLog } from "@/types/activityLog";
import React, { useState } from "react";
import ActivityDot from "./ActivityDot";
import { DateTime } from "luxon";

type ActivityEntryProps = {
	activities: ExActivityLog[];
	index: number;
};

const ActivityDetails = ({ activity }: { activity: ExActivityLog }) => {
	return (
		<div className="flex gap-x-2 font-poppins text-lg text-cutty-sark-950 items-center">
			<h2>{DateTime.fromJSDate(activity.createdAt).toFormat("t")}</h2>
			<div className="w-1 h-1 rounded-full  bg-cutty-sark-900" />

			<h2>{activity.user.name}</h2>
			<h2>{activity.details?.context}</h2>
		</div>
	);
};

const ActivityEntry = ({ activities, index }: ActivityEntryProps) => {
	const [isShowingAll, setIsShowingAll] = useState(false);
		

	const timestamp = DateTime.fromJSDate(activities[0].createdAt).toFormat("DD");

	return (
		<div className="flex flex-col gap-y-2">
			<div className="flex flex-row gap-x-2 items-center font-poppins text-xl">
				<ActivityDot index={index} />
				<h1>{timestamp}</h1>
			</div>
			<div className="ml-6 border-l-4 border-cutty-sark-500 pl-2">
				{activities.slice(0, isShowingAll ? activities.length : 5).map((activity) => (
					<ActivityDetails key={Math.random()} activity={activity} />
				))}

				<button className="mt-4 font-poppins text-xl text-cutty-sark-800" onClick={() => setIsShowingAll(!isShowingAll)}>{isShowingAll ? 'Show Less' : 'Show All'}</button>
			</div>
		</div>
	);
};

export default ActivityEntry;

