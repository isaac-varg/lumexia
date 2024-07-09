"use client";
import DataTable from "@/components/DataTable";
import { PurchaseOrderItem } from "@/types/purchaseOrderItem";
import React, { useEffect } from "react";
import columns from "../_configs/ItemTableColumns";
import purchaseOrderItemActions from "@/actions/purchasing/purchaseOrderItemActions";
import AddItemDialog from "./AddItemDialog";
import useDialog from "@/hooks/useDialog";
import { Item } from "@/types/item";
import { PurchaseOrder } from "@/types/purchaseOrder";
import { revalidatePage } from "@/actions/app/revalidatePage";
import { useRouter } from "next/navigation";
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";

type ItemTableProps = {
	orderItems: PurchaseOrderItem[];
	items: any[];
	purchaseOrder: PurchaseOrder;
};

const ItemTable = ({ orderItems, items, purchaseOrder }: ItemTableProps) => {
	const { showDialog } = useDialog();
	const router = useRouter();

	const handleRowUpdate = (row: any) => {
		const rowQuantity = row.quantity as any;
		// const rowPricePerUnit = row.pricePerUnit as any;

		const updateData = {
			pricePerUnit: parseFloat(row.pricePerUnit),
			quantity: parseFloat(rowQuantity),
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

	return (
		<div>
			<AddItemDialog data={items} onItemSelection={handleItemSelection} />
			<DataTable.Editable
				data={orderItems}
				columns={columns}
				onRowClick={(row) => {
					router.push(
						`/inventory/items/${row.original.item.name}?id=${row.original.item.id}`,
					);
				}}
				onRowUpdate={handleRowUpdate}
				onRowDelete={handleRowDelete}
				onRowAdd={handleRowAdd}
			/>
		</div>
	);
};

export default ItemTable;
