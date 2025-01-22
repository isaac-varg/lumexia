import React from "react";

type TitleProps = {
    children: React.ReactNode;
    size?: keyof typeof classes.size;
    color?: keyof typeof classes.color;
};

const classes = {
    size: {
        oldDefault: "text-2xl font-semibold ",
        default: '',
        small: "font-semibold text-base uppercase",
    },
    base: {
        daisy: 'card-title',
        old: 'font-poppins'
    },
    color: {
        old: 'text-cutty-sark-950',
        default: ''
    }

};


const Title = ({ children, size = "default", color = "default" }: TitleProps) => (
    <div className={`${classes.size[size]}  ${classes.color[color]} ${classes.base.daisy}`}>
        {children}
    </div>
);

export default Title;
