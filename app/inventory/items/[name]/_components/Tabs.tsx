"use client";
import React from "react";
import TabsPanel from "@/components/Tabs";
import { Item } from "@/types/item";
import LotsPanel from "./inventory/LotsPanel";
import { FlattenedLot } from "../_functions/flattenLots";
import { ContainerType } from "@/types/containerType";
import PurchasingPanel, { PurchaseOrderWithItems } from "./purchasing/PurchasingPanel";
import ProductionTab from "./production/ProductionTab";
import { BomUsage } from "../_functions/getBomUsage";

const TabsDemo = ({
  item,
  lots,
  containerTypes,
  purchaseOrders,
  usage
}: {
  item: Item;
  lots: FlattenedLot[];
  containerTypes: ContainerType[];
  purchaseOrders: PurchaseOrderWithItems[];
  usage: BomUsage
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


      <TabsPanel.Content identifier="production">
        <ProductionTab  item={item} usage={usage} />
      </TabsPanel.Content>
    </TabsPanel.Root>
  );
};

export default TabsDemo;
