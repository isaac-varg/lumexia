import React from "react";

const DialogTitle = ({
  title,
  children,
}: {
  title?: string | undefined;
  children?: React.ReactNode;
}) => {
  return (
    <h1 className="font-Poppins font-semibold text-3xl text-ishtar-800 mb-6">
      {title || children}
    </h1>
  );
};

export default DialogTitle;
