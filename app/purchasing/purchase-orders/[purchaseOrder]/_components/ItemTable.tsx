"use client";
import DataTable from "@/components/DataTable";
import { PurchaseOrderItem } from "@/types/purchaseOrderItem";
import React from "react";
import columns from "../_configs/ItemTableColumns";

type ItemTableProps = {
  items: PurchaseOrderItem[];
};

const ItemTable = ({ items }: ItemTableProps) => {
  return (
    <div>
      <DataTable.Editable
        data={items}
        columns={columns}
        onRowClick={(row) => {
          return null;
        }}
      />
    </div>
  );
};

export default ItemTable;
