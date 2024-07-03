import React from "react";

type DataProps = {
	icon?: JSX.Element;
	label?: string;
	data: string | number;
};

const Data = ({ icon, label, data }: DataProps) => {
	return (
		<span className="flex flex-row">
			<div className="flex flex-row gap-x-2 items-center">
				<div> {icon && icon}</div>
				<div>
					{label && <h1 className="text-poppins font-medium text-lg">{label}</h1>}
				</div>
			</div>
			<div>{data}</div>
		</span>
	);
};

export default Data;
