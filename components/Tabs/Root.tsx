import * as Tabs from "@radix-ui/react-tabs";
import React from "react";

const TabsRoot = ({ children, defaultTabIdentifier }: { children: React.ReactNode, defaultTabIdentifier: string }) => {
  return (
    <Tabs.Root
      className="flex flex-col shadow-lg rounded-md shadow-limed-spruce-200"
      defaultValue={defaultTabIdentifier}
    >
      {children}
    </Tabs.Root>
  );
};

export default TabsRoot;
