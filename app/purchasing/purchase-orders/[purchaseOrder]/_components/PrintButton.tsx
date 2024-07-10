"use client";
import ActionButton from "@/components/ActionButton";
import { PurchaseOrder } from "@/types/purchaseOrder";
import { PurchaseOrderItem } from "@/types/purchaseOrderItem";
import { createPurchaseOrder } from "@/utils/pdf/generators/purchaseOrder";
import { TbCloudDownload } from "react-icons/tb";import React from "react";
import Layout from "@/components/Layout";
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";

const PrintButton = ({ purchaseOrder, orderItems}: { purchaseOrder: PurchaseOrder, orderItems: PurchaseOrderItem[] }) => {
  const handleClick = async () => {

    await createPurchaseOrder(purchaseOrder.referenceCode, purchaseOrder.updatedAt, purchaseOrder.supplier, orderItems);

    await createActivityLog('downloadPurchaseOrderPDF', 'purchaseOrder', purchaseOrder.id, {context: 'po pdf downloaded'})
  };
  return (
    <>
      <ActionButton color="cararra" onClick={handleClick} ><Layout.Row><TbCloudDownload className="text-2xl" /> PO</Layout.Row></ActionButton>
    </>
  );
};

export default PrintButton;
