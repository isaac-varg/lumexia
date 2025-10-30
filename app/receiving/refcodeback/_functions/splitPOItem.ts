import purchaseOrderActions from "@/actions/purchasing/purchaseOrderActions";
import purchaseOrderItemActions from "@/actions/purchasing/purchaseOrderItemActions";
import { ExPurchaseOrderItem } from "@/types/purchaseOrderItem";

export const splitPOItem = async (
	item: ExPurchaseOrderItem,
	quantityReceived: number,
) => {
	const remainingQuantity = item.quantity - quantityReceived;

	const poItemUpdateData = {
		quantity: quantityReceived,
		purchaseOrderStatusId: "db907b0f-4aac-42d7-9118-ee35e178d9b3",
	};

	const createPOItemData = {
		itemId: item.item.id,
		purchaseOrderId: item.purchaseOrderId,
		pricePerUnit: item.pricePerUnit,
		quantity: remainingQuantity,
		uomId: item.uomId,
		purchaseOrderStatusId: 'd1c6bb97-a554-49b5-9a6a-0261405dc2cc' ,
	};

	const purchaseOrderUpdateData =  {
		statusId: '8b319770-6317-4cca-8a15-99df248dc603'
	}

	await purchaseOrderItemActions.update({id: item.id}, poItemUpdateData);
	await purchaseOrderItemActions.createNew(createPOItemData);
	await purchaseOrderActions.update({id: item.purchaseOrderId}, purchaseOrderUpdateData);

}
