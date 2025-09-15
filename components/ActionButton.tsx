import React from "react";

interface ActionButtonProps {
  label?: string;
  onClick?: () => void;
  size?: keyof typeof actionButtonClasses.sizes;
  color?: keyof typeof actionButtonClasses.colors;
  shape?: "default";
  buttonType?: "button" | "submit" | "reset";
  children?: React.ReactNode;
  [key: string]: any;
}

export const actionButtonClasses = {
  sizes: {
    default: "",
    large: "btn-lg"
  },
  colors: {
    default: "",
    neutral: 'btn-neutral',
    success: 'btn-success',
    secondarySoft: 'btn-soft btn-secondary',
    warningSoft: 'btn-soft btn-warning',
    warning: "btn-warning",
    error: "btn-error",
    errorSoft: 'btn-soft btn-error',
    info: "btn-info",
  },
  shapes: {
    default: "",
  },
};

const ActionButton = ({
  label,
  onClick,
  size = "default",
  color = "default",
  shape = "default",
  buttonType = "button",
  children,
}: ActionButtonProps) => {
  return (
    <button
      type={buttonType}
      className={`btn ${actionButtonClasses.sizes[size]} ${actionButtonClasses.colors[color]} `}
      onClick={onClick}
    >
      {children || label}
    </button>
  );
};

export default ActionButton;
