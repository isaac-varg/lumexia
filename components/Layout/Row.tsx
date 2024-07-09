import React from "react";

type RowProps = {
  children: React.ReactNode;
  justify?: keyof typeof classes.justify;
  gap?: keyof typeof classes.gap;
};

const classes = {
  justify: {
    between: "justify-between",
    end: "justify-end",
	start: "justify-start",
  },
  gap: {
    1: "gap-1",
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
  },
  
};

const Row = ({ children, justify = "between", gap = 2 }: RowProps) => (
  <div
    className={`flex flex-row ${classes.justify[justify]} items-center ${classes.gap[gap]}`}
  >
    {children}
  </div>
);

export default Row;
