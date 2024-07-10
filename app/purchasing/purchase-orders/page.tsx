import purchaseOrderActions from "@/actions/purchasing/purchaseOrderActions";
import React from "react";
import { flattenPurchaseOrders } from "./_functions/flattenPurchaseOrders";
import PurchaseOrderTable from "./_components/PurchaseOrderTable";
import NewPurchaseOrderDialog from "./_components/NewPurchaseOrderDialog";

const PurchasingPage = async () => {
  const purchaseOrders = await purchaseOrderActions.getAll(
    {},
    ["supplier", "status"],
    [{ referenceCode: "desc" }],
  );

  const flattenedPurchaseOrders = flattenPurchaseOrders(purchaseOrders);

  return (
    <div>
      <PurchaseOrderTable purchaseOrders={flattenedPurchaseOrders} />

      <NewPurchaseOrderDialog />
    </div>
  );
};

export default PurchasingPage;
