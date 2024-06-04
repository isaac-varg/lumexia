import React from "react";
import * as ContextMenu from "@radix-ui/react-context-menu";

const Content = ({ children }: { children: React.ReactNode }) => {
  return (
    <ContextMenu.Portal>
      <ContextMenu.Content
        className="min-w-[350px] bg-swirl-100 rounded-lg overflow-hidden p-3 shadow-xl">
        {children}
      </ContextMenu.Content>
    </ContextMenu.Portal>
  );
};

export default Content;
