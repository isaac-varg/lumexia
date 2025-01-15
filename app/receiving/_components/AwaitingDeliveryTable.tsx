"use client";
import { flattenPurchaseOrders } from "@/app/purchasing/purchase-orders/_functions/flattenPurchaseOrders";
import DataTable from "@/components/DataTable";
import { PurchaseOrder } from "@/types/purchaseOrder";
import React from "react";
import { columns } from "../_configs/Columns";
import { useRouter } from "next/navigation";
import { FlattenedPurchaseOrder } from "@/app/inventory/items/[name]/_functions/flattenPurchaseOrder";

type AwaitingDeliveryTableProps = {
  purchaseOrders: PurchaseOrder[] | any;
};

const AwaitingDeliveryTable = ({
  purchaseOrders,
}: AwaitingDeliveryTableProps) => {
  const orders = flattenPurchaseOrders(purchaseOrders);
  const router = useRouter();

  const handleRowClick = (order: FlattenedPurchaseOrder) => {
    router.push(`/receiving/${order.referenceCode}?id=${order.id}`);
  };

  if (orders.length === 0) {
    return (
      <div className="flex flex-col h-full items-center justify-center">
        <div className="flex flex-col items-center justify-center h-80 w-1/2 p-8 bg-neutral-100 rounded-lg">
          <h1 className="font-poppins text-5xl font-semibold text-neutral-800">
            Nothing to receive
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <DataTable.Default
        data={orders}
        onRowClick={(row) => handleRowClick(row.original)}
        columns={columns}
        tableStateName="receivingRecentlyCompleted"
      />
    </div>
  );
};

export default AwaitingDeliveryTable;
