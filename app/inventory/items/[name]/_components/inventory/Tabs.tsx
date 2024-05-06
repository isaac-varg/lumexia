"use client";
import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import TabsPanel from "@/components/Tabs";
import { Item } from "@/types/item";
import LotsTable from "./LotsTable";
import { FlattenedLot } from "../../_functions/flattenLots";
import { ContainerType } from "@/types/containerType";

const TabsDemo = ({
  item,
  lots,
  containerTypes
}: {
  item: Item;
  lots: FlattenedLot[];
  containerTypes: ContainerType[]
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
        <LotsTable item={item} lots={lots} containerTypes={containerTypes} />
      </TabsPanel.Content>
    </TabsPanel.Root>
  );
};

export default TabsDemo;
