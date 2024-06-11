"use client";
import React from "react";
import TabsPanel from "@/components/Tabs";
import { Item } from "@/types/item";
import LotsPanel from "./inventory/LotsPanel";
import { FlattenedLot } from "../_functions/flattenLots";
import { ContainerType } from "@/types/containerType";
import PurchasingPanel from "./purchasing/PurchasingPanel";

const TabsDemo = ({
  item,
  lots,
  containerTypes,
  purchaseOrders,
}: {
  item: Item;
  lots: FlattenedLot[];
  containerTypes: ContainerType[];
  purchaseOrders: any[];
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
        <LotsPanel item={item} lots={lots} containerTypes={containerTypes} />
      </TabsPanel.Content>

      <TabsPanel.Content identifier="purchasing">
        <PurchasingPanel purchaseOrders={purchaseOrders} item={item} />
      </TabsPanel.Content>
    </TabsPanel.Root>
  );
};

export default TabsDemo;
