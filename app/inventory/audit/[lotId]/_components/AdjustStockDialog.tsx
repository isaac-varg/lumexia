import Dialog from "@/components/Dialog";
import React, { useState } from "react";
import { LotWithData } from "../_types/LotWithData";
import Form from "@/components/Form";
import { useForm } from "react-hook-form";
import transactionActions from "@/actions/inventory/transactions";
import { getUserId } from "@/actions/users/getUserId";
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";
import { revalidatePage } from "@/actions/app/revalidatePage";
import useDialog from "@/hooks/useDialog";

type AdjustStockProps = {
	lot: LotWithData;
};

type Inputs = {
	quantity: number;
};

const AdjustStockDialog = ({ lot }: AdjustStockProps) => {
	const form = useForm<Inputs>();
	const {resetDialogContext } = useDialog();

	const handleSubmit = async (data: Inputs) => {
		const currentQuantity = lot.totalQuantityOnHand;
		const newQuantity = data.quantity;

		const adjustmentType =
			newQuantity - currentQuantity < 0
				? "601b5e2c-3fd2-4310-9a79-5a41244cdfd8"
				: "87c594f9-b49f-4889-9bc7-b840364a3698";
		const adjustmentQuantity = Math.abs(newQuantity - currentQuantity)


		const userId = await getUserId();
		const adjustmentData = {
			lotId: lot.id,
			transactionTypeId: adjustmentType,
			userId,
			uomId: "68171f7f-3ac0-4a3a-b197-18742ebf6b5b",
			amount: adjustmentQuantity, 
			systemNote: "Inventory Audit Adjustment",
			userNote: "",
		};

		await transactionActions.createNew(adjustmentData);
		await createActivityLog("inventoryAuditAdjustment", "lotId", lot.id, {
			context: `${lot.lotNumber} inventory was adjusted by ${adjustmentQuantity}`,
			item: lot.item.name,
			lotNumber: lot.lotNumber,
			adjustmentAmount: adjustmentQuantity,
			adjustmentTypeId: adjustmentType,
		});
		revalidatePage("/inventory/audit");
		resetDialogContext();
	};

	return (
		<Dialog.Root identifier={`adjustStock${lot.id}`}>
			<Dialog.Title>{`Adjusting ${lot.lotNumber}`}</Dialog.Title>
			<Form.Root form={form} onSubmit={handleSubmit}>
				<Form.Number
					form={form}
					fieldName={"quantity"}
					label={"Quantity (lb)"}
					required={true}
				/>
				<Form.ActionRow form={form} />
			</Form.Root>
		</Dialog.Root>
	);
};

export default AdjustStockDialog;
