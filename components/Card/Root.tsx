import React from "react";

interface CardRootProps {
	children: React.ReactNode;
	borderColor?: keyof typeof classes.borderColor;
	borderSize?: keyof typeof classes.borderSize;
	shadow?: keyof typeof classes.shadow;
	bg?: keyof typeof classes.bg;
}

const classes = {
	borderColor: {
		cuttySark: "border-cutty-sark-200",
		tasman: "border-tasman-400",
		light: "border-neutral-200",
	},
	borderSize: {
		base: "border-2",
		small: "border-[1px]",
	},
	shadow: {
		base: "shadow-lg shadow-limed-spruce-200",
		none: "",
	},
	bg: {
		base: "",
		cuttySark: "bg-cutty-sark-200",
		neutral: 'bg-white',
	},
};

const Root = ({
	children,
	borderColor = "cuttySark",
	borderSize = "base",
	shadow = "base",
	bg = "base",
}: CardRootProps) => (
	<div
		className={`flex flex-col w-full gap-y-4 p-6 rounded-lg ${classes.borderSize[borderSize]} ${classes.borderColor[borderColor]} ${classes.shadow[shadow]} ${classes.bg[bg]}  h-full`}
	>
		{children}
	</div>
);

export default Root;
