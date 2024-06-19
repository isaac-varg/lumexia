import React from "react";
import { flattenPurchaseOrders } from "../../_functions/flattenPurchaseOrder";
import PurchasesTable from "./PurchasesTable";
import PurchasingTotals from "./PurchasingTotals";
import { PurchaseOrder } from "@/types/purchaseOrder";
import { PurchaseOrderItem } from "@/types/purchaseOrderItem";
import { Item } from "@/types/item";

export interface PurchaseOrderWithItems extends PurchaseOrder {
	purchaseOrderItems: PurchaseOrderItem[]
}

type PurchasingPanelType = {
  purchaseOrders: PurchaseOrderWithItems[]; 
  item: Item;
};

const PurchasingPanel = ({ purchaseOrders, item }: PurchasingPanelType) => {
  const flattenedPurchaseOrders = flattenPurchaseOrders(purchaseOrders);
  return (
    <>
      <PurchasingTotals purchaseOrders={flattenedPurchaseOrders} item={item} />
    </>
  );
};

export default PurchasingPanel;
