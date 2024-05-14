"use client";
import DataTable from "@/components/DataTable";
import { PurchaseOrderItem } from "@/types/purchaseOrderItem";
import React from "react";
import columns from "../_configs/ItemTableColumns";
import purchaseOrderItemActions from "@/actions/purchasing/purchaseOrderItemActions";
import AddItemDialog from "./AddItemDialog";
import useDialog from "@/hooks/useDialog";

type ItemTableProps = {
  orderItems: PurchaseOrderItem[];
  items: any[];
};

const ItemTable = ({ orderItems, items }: ItemTableProps) => {
  const { showDialog } = useDialog();
  const handleRowUpdate = (row: any) => {
    console.log(row);

    const rowQuantity = row.quantity as any;

    const updateData = {
      pricePerUnit: row.pricePerUnit,
      quantity: parseFloat(rowQuantity),
    };

    purchaseOrderItemActions.update({ id: row.id }, updateData);
  };

  const handleRowDelete = (row: any) => {
    purchaseOrderItemActions.deleteOne({ id: row.id });
  };

  const handleRowAdd = () => {
    showDialog("addItemDialog");

    return "fmemmamsmdad";
  };
  return (
    <>
      <AddItemDialog data={items} />
      <DataTable.Editable
        data={orderItems}
        columns={columns}
        onRowClick={(row) => {
          return null;
        }}
        onRowUpdate={handleRowUpdate}
        onRowDelete={handleRowDelete}
        onRowAdd={handleRowAdd}
      />
    </>
  );
};

export default ItemTable;
