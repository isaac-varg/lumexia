import React from "react";
import * as ContextMenu from "@radix-ui/react-context-menu";

const Trigger = ({ children, asChild=false}: { children: React.ReactNode , asChild?: boolean }) => {
  return <ContextMenu.Trigger asChild={asChild}>{children}</ContextMenu.Trigger>;
};

export default Trigger;
