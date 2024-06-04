"use client";
import * as ContextMenu from "@radix-ui/react-context-menu";
import Content from "./Content";

const ContextMenuMain = ({ children }: { children: React.ReactNode }) => {
  return (
    <ContextMenu.Root>

      {children}
    </ContextMenu.Root>
  );
};

export default ContextMenuMain;
