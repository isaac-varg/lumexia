import React from "react";

type TagLabelProps = {
    children: React.ReactNode;
    size?: keyof typeof classes.size;
    color?: keyof typeof classes.color;
}

const classes = {
    color: {
        neautral: "bg-cararra-400",
	draft: "bg-neutral-200 text-neutral-600",
	amber: "bg-amber-200 text-amber-600",	
	orange: "bg-orange-200 text-orange-600",
	bayLeaf: "bg-bay-leaf-200 text-bay-leaf-600",
    },
    size: {
        normal: 'py-1 px-4 text-lg',
	big: 'py-2 px-4 text-lg',
    }
  };

const TagLabel = ({ children, size = 'normal', color = 'draft'}:  TagLabelProps) => {
  return <div className={`flex flex-row items-center rounded-lg font-poppins font-medium ${classes.color[color]} ${classes.size[size]}`}>{children}</div>;
};

export default TagLabel;
