"use server";

import purchaseOrderItemActions from "@/actions/purchasing/purchaseOrderItemActions";
import purchaseOrderStatusActions from "@/actions/purchasing/purchaseOrderStatusActions";
import { ExPurchaseOrderItem } from "@/types/purchaseOrderItem";
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";

export const nextItemStatuses = async (
	nextStatusId: string,
	purchaseOrderId: string,
) => {
	const items: ExPurchaseOrderItem[] = await purchaseOrderItemActions.getAll({
		purchaseOrderId,
	}, ["item"]);

	const status = await purchaseOrderStatusActions.getOne(nextStatusId);

	items.forEach(async (item) => {
		await purchaseOrderItemActions.update(
			{ id: item.id },
			{ purchaseOrderStatusId: nextStatusId },
		);

		createActivityLog(
			"modifyPurchaseOrderItem",
			"purchaseOrder",
			purchaseOrderId,
			{
				context: `${item.item.name} status changed to ${status.name}`,
				purchaseOrderItemId: item.id,
				itemName: item.item.name,
			},
		);
	});
};
