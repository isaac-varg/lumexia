import React from "react";

const LabelDataPair = ({
	label,
	data,
	children,
}: {
	label?: string;
	data: string | number;
	children?: React.ReactNode;
}) => {
	return (
		<span className="flex justify-between border-b-[1px] border-dotted border-b-cutty-sark-500">
			<label className="font-inter font-medium text-lg text-neutral-600">
				{label || children}
			</label>
			<p className="font-inter ">{data}</p>
		</span>
	);
};

export default LabelDataPair;
