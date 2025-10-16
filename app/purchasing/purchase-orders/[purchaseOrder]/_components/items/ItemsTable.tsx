"use client";
import DataTable from "@/components/DataTable";
import React, { useCallback, useEffect, useState } from "react";
import purchaseOrderItemActions from "@/actions/purchasing/purchaseOrderItemActions";
import useDialog from "@/hooks/useDialog";
import { Item } from "@/types/item";
import { useRouter } from "next/navigation";
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { revalidatePage } from "@/actions/app/revalidatePage";
import Card from "@/components/Card";
import { User } from "@/actions/users/getUser";
import { getSlug } from "@/utils/general/getSlug";
import { usePurchasingSelection } from "@/store/purchasingSlice";
import { useAppSelection } from "@/store/appSlice";
import createColumns from "../../_configs/ItemTableColumns";
import AddItemDialog from "./AddItemDialog";
import { ItemTableLockedColumns } from "../../_configs/ItemTableLockedLocked";
import { userRoles } from "@/configs/staticRecords/userRoles";



const ItemTable = () => {

  const { purchaseOrder, orderItems, purchasableItems: items } = usePurchasingSelection();
  const { user } = useAppSelection()
  const { showDialog } = useDialog();
  const [columns, setColumns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true)
  const isLocked = !user || user.UserRoleAssignment.length === 0 || user.UserRoleAssignment.every(r => r.userRoleId !== userRoles.purchasing)


  const router = useRouter();


  const handleRowUpdate = (row: any) => {
    if (!purchaseOrder) return;

    console.log(row)
    const rowQuantity = row.quantity as any;
    // const rowPricePerUnit = row.pricePerUnit as any;
    const updateData = {
      pricePerUnit: parseFloat(row.pricePerUnit),
      quantity: parseFloat(rowQuantity),
      uomId: row.uomId,
    };

    console.log(updateData);

    purchaseOrderItemActions.update({ id: row.id }, updateData);

    createActivityLog(
      "modifyPurchaseOrderItem",
      "purchaseOrder",
      purchaseOrder.id,
      {
        context: `PO #${purchaseOrder.referenceCode} item ${row.item.name} was modified`,
        poItemId: row.id,
        itemId: row.item.id,
        pricePerUnit: row.pricePerUnit,
        quantity: row.quantity,
      },
    );

    revalidatePage("purchasing/purchase-orders/[purchaseOrder]");
  };

  const handleRowDelete = (row: any) => {

    if (!purchaseOrder) return;

    purchaseOrderItemActions.deleteOne({ id: row.id });
    createActivityLog(
      "deletePurchaseOrderItem",
      "purchaseOrder",
      purchaseOrder.id,
      {
        context: `PO #${purchaseOrder.referenceCode} item ${row.item.name} was deleted`,
      },
    );
  };

  const handleItemSelection = async (item: Item) => {

    if (!purchaseOrder) return;
    const newItem = {
      itemId: item.id,
      purchaseOrderId: purchaseOrder.id,
      pricePerUnit: 0,
      quantity: 0,
      uomId: "68171f7f-3ac0-4a3a-b197-18742ebf6b5b",
      purchaseOrderStatusId: purchaseOrder.statusId,
    };

    const response = await purchaseOrderItemActions.createNew(newItem);

    await createActivityLog(
      "createPurchaseOrderItem",
      "purchaseOrder",
      purchaseOrder.id,
      {
        context: `${item.name} was added to PO #${purchaseOrder.referenceCode}`,
        itemId: item.id,
        itemName: item.name,
        poItemId: response.id,
      },
    );

    location.reload();
  };

  const handleRowAdd = useCallback(() => {
    showDialog("addItemDialog");
  }, [showDialog]);

  const handleRowClick = (row: any) => {

    const formattedName = getSlug(row.original.item.name)
    const path = `/inventory/items/${`${formattedName}?id=${row.original.item.id}`} `
    router.push(path)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "c") {
        event.preventDefault();
        handleRowAdd();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleRowAdd]);


  useEffect(() => {
    const fetchColumns = async () => {
      const cols = await createColumns();
      setColumns(cols);
      setIsLoading(false)
    };

    fetchColumns();

  }, []);


  if (isLoading) {
    return <Card.Root span={2}><Skeleton count={5} /></Card.Root>
  }



  return (
    <Card.Root span={2}>
      <Card.Title>Items</Card.Title>
      <AddItemDialog data={items} onItemSelection={handleItemSelection} />
      {isLocked ? <DataTable.Default data={orderItems} columns={ItemTableLockedColumns} onRowClick={(row) => handleRowClick(row)} tableStateName="poDetailsItems" /> : <DataTable.Editable
        data={orderItems}
        columns={columns}
        onRowClick={(row) => handleRowClick(row)}
        onRowUpdate={handleRowUpdate}
        onRowDelete={handleRowDelete}
        onRowAdd={handleRowAdd}
      />}
    </Card.Root>
  );
};



export default ItemTable;
