"use client";

import { revalidatePage } from "@/actions/app/revalidatePage";
import purchaseOrderActions from "@/actions/purchasing/purchaseOrderActions";
import ActionButton from "@/components/ActionButton";
import { PurchaseOrder } from "@/types/purchaseOrder";
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";

const CompleteReceivingButton = ({
	isAwaitingItems,
	purchaseOrder,
}: {
	isAwaitingItems: boolean;
	purchaseOrder: PurchaseOrder;
}) => {
	const handleComplete = async () => {
		await purchaseOrderActions.update(
			{ id: purchaseOrder.id },
			{ statusId: "db907b0f-4aac-42d7-9118-ee35e178d9b3" },
		);

		await createActivityLog('modifyPurchaseOrder', 'purchaseOrder', purchaseOrder.id, { context: `Purchase Order completed and received`})
		revalidatePage('/receiving/[referenceCode]');
	};



	if (isAwaitingItems) {
		return null;
	}

	return (
		<div>
			<ActionButton onClick={() => handleComplete()}>Complete</ActionButton>
		</div>
	);
};

export default CompleteReceivingButton;
