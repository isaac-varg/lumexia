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
import PricingTab from "./pricing/PricingTab";
import { PanelStates } from "@/store/panelSelectionSlice";

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
    const isPurchased = item.procurementType?.name === "Purchased"
    const tabs = [
        { identifier: "inventory", label: "Inventory" },
        { identifier: "production", label: "Production" },
    ];

    const purchasedAdditionalTabs = [
        { identifier: "purchasing", label: "Purchasing" },
        { identifier: "pricing", label: "Pricing" }
    ]
    if (isPurchased) {
        tabs.splice(1, 0, ...purchasedAdditionalTabs);
    }

    const panelStateName: PanelStates = isPurchased ? 'itemDetails' : 'productionItemDetails'

    return (
        <TabsPanel.Root panelStateName={panelStateName}>
            <TabsPanel.List tabTriggers={tabs} panelStateName={panelStateName} />

            <TabsPanel.Content identifier="inventory">
                <LotsPanel item={item} lots={lots} containerTypes={containerTypes} />
            </TabsPanel.Content>

            <TabsPanel.Content identifier="purchasing">
                <PurchasingPanel purchaseOrders={purchaseOrders} item={item} />
            </TabsPanel.Content>

            <TabsPanel.Content identifier="pricing">
                <PricingTab />
            </TabsPanel.Content>



            <TabsPanel.Content identifier="production">
                <ProductionTab item={item} usage={usage} />
            </TabsPanel.Content>
        </TabsPanel.Root>
    );
};

export default TabsDemo;
