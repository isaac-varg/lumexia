import React from "react";

interface CardRootProps {
	children: React.ReactNode;
	borderColor?: keyof typeof classes.borderColor;
	borderSize?: keyof typeof classes.borderSize;
	shadow?: keyof typeof classes.shadow;
	bg?: keyof typeof classes.bg;
    type?: keyof typeof classes.type;

}

// TODO make this so you can toggle between h-full and not

const classes = {
	borderColor: {
		cuttySark: "border-cutty-sark-200",
		tasman: "border-tasman-400",
		light: "border-neutral-200",
        base: ""
	},
	borderSize: {
		base: "",
		small: "border-[1px]",
        old: "border-2"
	},
	shadow: {
		base: "shadow-xl",
		none: "",
		old: "shadow-lg shadow-limed-spruce-200",
	},
	bg: {
		base: "",
		cuttySark: "bg-cutty-sark-200",
		neutral: 'bg-white',
	},
    type: {
        old: 'rounded-lg p-6',
        dasiy: 'card'
    }
};

const wrapper = {
    old: 'flex flex-col w-full gap-y-4 p-6',
    daisy: 'card-body flex flex-col gap-y-4'
}

const Root = ({
	children,
	borderColor = "base",
	borderSize = "base",
	shadow = "base",
	bg = "base",
    type = 'dasiy',

}: CardRootProps) => (
	<div
		className={`  ${classes.type[type]} ${classes.borderSize[borderSize]} ${classes.borderColor[borderColor]} ${classes.shadow[shadow]} ${classes.bg[bg]}  h-full`}
	>
        <div className={`${wrapper.daisy}`}>
		{children}
        </div>
	</div>
);

export default Root;
