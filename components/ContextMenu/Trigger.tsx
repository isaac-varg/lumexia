import React from "react";
import * as ContextMenu from "@radix-ui/react-context-menu";

const Trigger = ({ children }: { children: React.ReactNode }) => {
  return <ContextMenu.Trigger>{children}</ContextMenu.Trigger>;
};

export default Trigger;
