"use client";
import DataTable from "@/components/DataTable";
import { PurchaseOrderItem } from "@/types/purchaseOrderItem";
import React, { useEffect, useState } from "react";
import purchaseOrderItemActions from "@/actions/purchasing/purchaseOrderItemActions";
import AddItemDialog from "./AddItemDialog";
import useDialog from "@/hooks/useDialog";
import { Item } from "@/types/item";
import { useRouter } from "next/navigation";
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";
import createColumns from "../_configs/ItemTableColumns";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { staticRecords } from "@/configs/staticRecords";
import { ItemTableLockedColumns } from "../_configs/ItemTableLockedLocked";
import { PurchaseOrderDetails } from "../_functions/getPurchaseOrder";
import { revalidatePage } from "@/actions/app/revalidatePage";
import Card from "@/components/Card";


type ItemTableProps = {
    orderItems: PurchaseOrderItem[];
    items: any[];
    purchaseOrder: PurchaseOrderDetails;
};

const ItemTable = ({ orderItems, items, purchaseOrder }: ItemTableProps) => {
    const { showDialog } = useDialog();
    const [columns, setColumns] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true)
    const isLocked = purchaseOrder.statusId === staticRecords.purchasing.poStatuses.received || purchaseOrder.statusId === staticRecords.purchasing.poStatuses.confirmedSlashAwaitingDelivery

    const router = useRouter();


    const handleRowUpdate = (row: any) => {
        const rowQuantity = row.quantity as any;
        // const rowPricePerUnit = row.pricePerUnit as any;
        const updateData = {
            pricePerUnit: parseFloat(row.pricePerUnit),
            quantity: parseFloat(rowQuantity),
            uomId: row.uomId,
        };

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

    const handleRowAdd = () => {
        showDialog("addItemDialog");
    };

    const handleRowClick = (row: any) => {
        router.push(
            `/inventory/items/${row.original.item.name}?id=${row.original.item.id}`,
        )
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
    }, []);


    useEffect(() => {
        const fetchColumns = async () => {
            const cols = await createColumns();
            setColumns(cols);
            setIsLoading(false)
        };

        fetchColumns();

    }, []);


    if (isLoading) {
        return <div><Skeleton count={5} /></div>;
    }



    return (
        <Card.Root>
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
