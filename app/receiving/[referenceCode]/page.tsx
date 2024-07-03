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
	

	const activity = await activityLogActions.getAll({action: "modifyPurchaseOrderItem", entityId: poId}, ["user"])

	console.log(activity)

	return (
		<div className="flex flex-col gap-y-6 mt-6">
			<PageTitle>
				#{purchaseOrder.referenceCode} - {purchaseOrder.supplier.name}
			</PageTitle>

			<LineItemPanels items={items} />

			<ActivityPanel activities={activity} />
		</div>
	);
};

export default ReceivingPOPage;
