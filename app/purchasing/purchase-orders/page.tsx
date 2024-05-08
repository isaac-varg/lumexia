import purchaseOrderActions from "@/actions/purchasing/purchaseOrderActions";
import React from "react";
import { flattenPurchaseOrders } from "./_functions/flattenPurchaseOrders";
import PurchaseOrderTable from "./_components/PurchaseOrderTable";

const PurchasingPage = async () => {
  const purchaseOrders = await purchaseOrderActions.getAll({}, ["supplier", "status"]);

  const flattenedPurchaseOrders = flattenPurchaseOrders(purchaseOrders);

  console.log(flattenedPurchaseOrders);

  return <div>
    <PurchaseOrderTable purchaseOrders={flattenedPurchaseOrders} />
  </div>;
};

export default PurchasingPage;
