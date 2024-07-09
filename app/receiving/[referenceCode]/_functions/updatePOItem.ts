import purchaseOrderItemActions from "@/actions/purchasing/purchaseOrderItemActions";

export const updatePOItem = async (poItemId: string, updateData: any) => {
	await purchaseOrderItemActions.update({ id: poItemId }, updateData);
};
