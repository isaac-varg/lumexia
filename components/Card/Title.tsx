import React from "react";

type TitleProps = {
  children: React.ReactNode;
  size?: keyof typeof classes.size;
};

const classes = {
  size: {
    default: " text-2xl font-semibold ",
    small: "font-semibold text-base uppercase",
  },
};

const Title = ({ children, size = "default" }: TitleProps) => (
  <h2 className={`font-poppins ${classes.size[size]} text-cutty-sark-950`}>
    {children}
  </h2>
);

export default Title;
