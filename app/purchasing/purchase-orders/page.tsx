import React from "react";
import PurchaseOrderTable from "./_components/PurchaseOrderTable";
import NewPurchaseOrderDialog from "./_components/NewPurchaseOrderDialog";
import { getPurchaseOrdersForDashboard } from "./_functions/getPurchaseOrders";

const PurchasingPage = async () => {

  const purchaseOrders = await getPurchaseOrdersForDashboard();

  return (
    <div>
      <PurchaseOrderTable purchaseOrders={purchaseOrders} />

      <NewPurchaseOrderDialog />
    </div>
  );
};

export default PurchasingPage;
