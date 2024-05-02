"use client";
import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import TabsPanel from "@/components/Tabs";
import { Item } from "@/types/item";
import LotsTable from "./LotsTable";
import { FlattenedLot } from "../_functions/flattenLots";

const TabsDemo = ({
  item,
  lots,
}: {
  item: Item;
  lots: FlattenedLot[];
}) => {
  const tabs = [
    { identifier: "inventory", label: "Inventory" },
    { identifier: "production", label: "Production" },
  ];
  if (item.procurementType?.name === "Purchased") {
    tabs.splice(1, 0, { identifier: "purchasing", label: "Purchasing" });
  }

  return (
    <TabsPanel.Root defaultTabIdentifier="inventory">
      <TabsPanel.List tabTriggers={tabs} />

      <TabsPanel.Content identifier="inventory">
        <LotsTable lots={lots} />
      </TabsPanel.Content>
    </TabsPanel.Root>
  );
};

export default TabsDemo;
