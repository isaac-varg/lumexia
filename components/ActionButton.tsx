import React from "react";

interface ActionButtonProps {
	label?: string;
	onClick?: () => void;
	size?: "default";
	color?: keyof typeof actionButtonClasses.colors;
	shape?: "default";
	buttonType?: "button" | "submit" | "reset";
	children?: React.ReactNode;
	[key: string]: any;
}

export const actionButtonClasses = {
	sizes: {
		default: "py-2 px-4",
	},
	colors: {
		default: "bg-bay-leaf-300 hover:bg-bay-leaf-400 text-white",
		cuttySark: "bg-cutty-sark-300 hover:bg-cutty-sark-400 text-white",
		cararra: "bg-cararra-300 hover:bg-cararra-400 text-white",
		alert: "bg-rose-300 hover:bg-rose-400 text-white",
		indigo: "bg-indigo-300 hover:bg-indigo-400 text-white",
		bayLeaf: "bg-bay-leaf-300 hover:bg-bay-leaf-400 text-white",

	},
	shapes: {
		default: "rounded",
	},
};

const ActionButton = ({
	label,
	onClick,
	size = "default",
	color = "default",
	shape = "default",
	buttonType = "button",
	children,
}: ActionButtonProps) => {
	return (
		<button
			type={buttonType}
			className={`font-poppins shadow-bay-leaf-300 shadow-md ${actionButtonClasses.sizes[size]} ${actionButtonClasses.colors[color]} ${actionButtonClasses.shapes[shape]}`}
			onClick={onClick}
		>
			{children || label}
		</button>
	);
};

export default ActionButton;
