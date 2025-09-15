import React from "react";

type TagLabelProps = {
  children: React.ReactNode;
  size?: keyof typeof classes.size;
  color?: keyof typeof classes.color;
}

const classes = {
  color: {
    neautral: "bg-neutral",
    draft: "bg-neutral/30 text-neutral-content",
    amber: "bg-amber-200 text-amber-600",
    orange: "bg-orange-200 text-orange-600",
    bayLeaf: "bg-success text-success-content",
  },
  size: {
    normal: 'py-1 px-4 text-lg',
    big: 'py-2 px-4 text-lg',
  }
};

const TagLabel = ({ children, size = 'normal', color = 'draft' }: TagLabelProps) => {
  return <div className={`flex flex-row items-center rounded-lg font-poppins font-medium ${classes.color[color]} ${classes.size[size]}`}>{children}</div>;
};

export default TagLabel;
