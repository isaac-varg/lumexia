import purchaseOrderActions from "@/actions/purchasing/purchaseOrderActions";
import purchaseOrderStatusActions from "@/actions/purchasing/purchaseOrderStatusActions";
import React from "react";
import AwaitingDeliveryTable from "./_components/AwaitingDeliveryTable";
import prisma from "@/lib/prisma";

const ReceivingPage = async () => {
	const awaitingDeliveryStatus = await purchaseOrderStatusActions.getOne(
		undefined,
		{ sequence: 3 },
	);
	const partiallyDeliveryStatus = await purchaseOrderStatusActions.getOne(
		undefined,
		{ sequence: 5 },
	);

	const awaitingDeliveryPOs = await prisma.purchaseOrder.findMany({
		where: {
			OR: [
				{ statusId: { equals: partiallyDeliveryStatus.id } },
				{ statusId: { equals: awaitingDeliveryStatus.id } },
			],
		},
		include: {
			supplier: true,
			status: true,
		},

	});


	return (
		<div>
			<AwaitingDeliveryTable purchaseOrders={awaitingDeliveryPOs} />
		</div>
	);
};

export default ReceivingPage;
