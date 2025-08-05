import React from "react";

interface ActionButtonProps {
	label?: string;
	onClick?: () => void;
	size?: keyof typeof actionButtonClasses.sizes;
	color?: keyof typeof actionButtonClasses.colors;
	shape?: "default";
	buttonType?: "button" | "submit" | "reset";
	children?: React.ReactNode;
	[key: string]: any;
}

export const actionButtonClasses = {
	sizes: {
		default: "py-2 px-4 ",
        large: "py-4 px-6 text-4xl"
	},
	colors: {
		default: "btn btn-accent",
		cuttySark: "bg-cutty-sark-300 hover:bg-cutty-sark-400 text-white",
		cararra: "bg-cararra-300 hover:bg-cararra-400 text-white",
		alert: "bg-rose-300 hover:bg-rose-400 text-white",
		indigo: "bg-indigo-300 hover:bg-indigo-400 text-white",
		bayLeaf: "bg-bay-leaf-300 hover:bg-bay-leaf-400 text-white",

	},
	shapes: {
		default: "",
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
			className={`font-poppins shadow-md ${actionButtonClasses.sizes[size]} ${actionButtonClasses.colors[color]} ${actionButtonClasses.shapes[shape]}`}
			onClick={onClick}
		>
			{children || label}
		</button>
	);
};

export default ActionButton;
