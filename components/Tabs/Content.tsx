import React from "react";
import * as Tabs from "@radix-ui/react-tabs";

const TabContent = ({
  identifier,
  children,
}: {
  identifier: string;
  children: React.ReactNode;
}) => {
  return (
    <Tabs.Content value={identifier}>
      <div className="p-4">{children}</div>
    </Tabs.Content>
  );
};

export default TabContent;
