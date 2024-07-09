import purchaseOrderActions from "@/actions/purchasing/purchaseOrderActions";
import purchaseOrderItemActions from "@/actions/purchasing/purchaseOrderItemActions";
import Layout from "@/components/Layout";
import React from "react";
import LineItemCard from "./_components/LineItemCard";
import { ExPurchaseOrderItem } from "@/types/purchaseOrderItem";
import PageTitle from "@/components/Text/PageTitle";
import LineItemPanels from "./_components/LineItemPanels";
import activityLogActions from "@/actions/auxiliary/activityLogActions";
import ActivityPanel from "./_components/ActivityPanel";
import CompleteReceivingButton from "./_components/CompleteReceivingButton";

type ReceivingPOPageProps = {
	searchParams: {
		id: string;
	};
};

const ReceivingPOPage = async ({ searchParams }: ReceivingPOPageProps) => {
	const poId = searchParams.id;

	const purchaseOrder = await purchaseOrderActions.getOne(poId, undefined, [
		"supplier",
	]);
	const items: ExPurchaseOrderItem[] = await purchaseOrderItemActions.getAll(
		{
			purchaseOrderId: poId,
		},
		["item", "uom", "purchaseOrderStatus"],
	);

	const activity = await activityLogActions.getAll(
		{ entityType: "purchaseOrder", entityId: poId },
		["user"],
	);

	const isAwaitingItems = items.some(item => item.purchaseOrderStatus.sequence === 3);

	return (
		<div className="flex flex-col gap-y-6 mt-6">
			<Layout.Row>
			<PageTitle>
				#{purchaseOrder.referenceCode} - {purchaseOrder.supplier.name}
			</PageTitle>

				<CompleteReceivingButton isAwaitingItems={isAwaitingItems} purchaseOrder={purchaseOrder}/>

			</Layout.Row>
			<LineItemPanels items={items} />

			<ActivityPanel activities={activity} />
		</div>
	);
};

export default ReceivingPOPage;
