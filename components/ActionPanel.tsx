"use client"
// this is like the action button larger for tablet use

import React from 'react'

const classes = {
  base: 'flex flex-col gap-y-2',
  padding: {
    default: "p-4 ",
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
    default: "rounded-lg",
  },
  children: {
    default: "font-poppins text-xl font-bold text-neutral-700 flex items-center justify-center"
  }
};


interface Props {
  onClick?: () => void;
  children: React.ReactNode;
  padding?: keyof typeof classes.padding;
  color?: keyof typeof classes.colors;
  shape?: keyof typeof classes.shapes;
  childrenStyle?: keyof typeof classes.children;
}

const ActionPanel = ({
  onClick,
  children,
  color = 'default',
  shape = 'default',
  padding = 'default',
  childrenStyle = 'default',
}: Props) => {
  return (
    <div
      className={`${classes.base} ${classes.colors[color]} ${classes.shapes[shape]} ${classes.padding[padding]}`}
      onClick={onClick}
    >
      <div className={`${classes.children[childrenStyle]}`}>
        {children}
      </div>
    </div>
  )
}

export default ActionPanel
