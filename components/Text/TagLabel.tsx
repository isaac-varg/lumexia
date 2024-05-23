import React from "react";

type TagLabelProps = {
    children: React.ReactNode;
    size?: keyof typeof classes.size;
    color?: keyof typeof classes.color;
}

const classes = {
    color: {
        neautral: "bg-cararra-400",
    },
    size: {
        normal: 'py-1 px-4'
    }
  };

const TagLabel = ({ children, size, color}:  TagLabelProps) => {
  return <div className={`flex flex-row items-center rounded-lg ${classes.color.neautral} ${classes.size.normal}`}>{children}</div>;
};

export default TagLabel;
