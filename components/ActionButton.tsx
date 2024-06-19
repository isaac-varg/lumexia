import React from "react";

interface ActionButtonProps {
  label?: string;
  onClick?: () => void;
  size?: "default";
  color?: keyof typeof classes.colors; 
  shape?: "default";
  buttonType?: "button" | "submit" | "reset";
  children?: React.ReactNode;
  [key: string]: any;
}

const classes = {
  sizes: {
    default: "py-2 px-4",
  },
  colors: {
    default: "bg-bay-leaf-300 hover:bg-bay-leaf-400 text-white",
    cuttySark: "bg-cutty-sark-300 hover:bg-cutty-sark-400 text-white",
	cararra: "bg-cararra-300 hover:bg-cararra-400 text-white",
  },
  shapes: {
    default: "rounded",
  },
};

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  onClick,
  size = "default",
  color = "default",
  shape = "default",
  buttonType = "button",
  children,
  ...rest
}) => {
  return (
    <button
      type={buttonType}
      className={`font-poppins shadow-bay-leaf-300 shadow-md ${classes.sizes[size]} ${classes.colors[color]} ${classes.shapes[shape]}`}
      onClick={onClick}
    >
      {children || label}
    </button>
  );
};

export default ActionButton;
