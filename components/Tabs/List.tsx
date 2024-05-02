import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import TabsPanel from ".";

type TabsListProps = {
  tabTriggers: { identifier: string; label: string }[];
};

const TabList = ({ tabTriggers }: TabsListProps) => {
  return (
    <Tabs.List
      className="shrink-0 flex border-b border-limed-spruce-500"
    >
      {tabTriggers.map((tab) => (
        <TabsPanel.Trigger
          key={tab.identifier}
          identifier={tab.identifier}
          label={tab.label}
        />
      ))}
    </Tabs.List>
  );
};

export default TabList;
