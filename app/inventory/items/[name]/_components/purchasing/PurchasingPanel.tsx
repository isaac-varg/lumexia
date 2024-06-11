import React from "react";
import { flattenPurchaseOrders } from "../../_functions/flattenPurchaseOrder";
import PurchasesTable from "./PurchasesTable";
import PurchasingTotals from "./PurchasingTotals";

type PurchasingPanelType = {
  purchaseOrders: any; // wow
};

const PurchasingPanel = ({ purchaseOrders }: PurchasingPanelType) => {
  const flattenedPurchaseOrders = flattenPurchaseOrders(purchaseOrders);

  return (
    <div>
    	<PurchasingTotals purchaseOrders={flattenedPurchaseOrders} />
      <PurchasesTable purchaseOrders={flattenedPurchaseOrders} />
    </div>
  );
};

export default PurchasingPanel;
