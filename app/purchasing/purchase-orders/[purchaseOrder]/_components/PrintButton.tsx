"use client";
import ActionButton from "@/components/ActionButton";
import { PurchaseOrder } from "@/types/purchaseOrder";
import { PurchaseOrderItem } from "@/types/purchaseOrderItem";
import { createPurchaseOrder } from "@/utils/pdf/generators/purchaseOrder";
import { TbCloudDownload } from "react-icons/tb";import React from "react";
import Layout from "@/components/Layout";

const PrintButton = ({ purchaseOrder, orderItems}: { purchaseOrder: PurchaseOrder, orderItems: PurchaseOrderItem[] }) => {
  const handleClick = async () => {

    createPurchaseOrder(purchaseOrder.referenceCode, purchaseOrder.updatedAt, purchaseOrder.supplier, orderItems);
  };
  return (
    <>
      <ActionButton onClick={handleClick} ><Layout.Row><TbCloudDownload className="text-xl" /> PO</Layout.Row></ActionButton>
    </>
  );
};

export default PrintButton;
