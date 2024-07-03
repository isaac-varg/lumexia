import purchaseOrderActions from "@/actions/purchasing/purchaseOrderActions";
import purchaseOrderStatusActions from "@/actions/purchasing/purchaseOrderStatusActions";
import React from "react";
import AwaitingDeliveryTable from "./_components/AwaitingDeliveryTable";

const ReceivingPage = async () => {
	const awaitingDeliveryStatus = await purchaseOrderStatusActions.getOne(
		undefined,
		{ sequence: 3 },
	);

	const awaitingDeliveryPOs = await purchaseOrderActions.getAll(
		{
			statusId: awaitingDeliveryStatus.id,
		},
		["supplier", "status"],
	);

	console.log(awaitingDeliveryPOs);

	return (
		<div>
			<AwaitingDeliveryTable purchaseOrders={awaitingDeliveryPOs} />
		</div>
	);
};

export default ReceivingPage;
