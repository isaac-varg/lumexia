import React from "react";
import Tabs from "./Tabs";
import { Item } from "@/types/item";
import { flattenLots } from "../_functions/flattenLots";
import lotActions from "@/actions/inventory/lotActions";
import prisma from "@/lib/prisma";
import containerTypeActions from "@/actions/inventory/containerTypeActions";

const TabsPanel = async ({ item }: { item: Item }) => {
	const lots = await lotActions.getByItem(item.id);
	const containerTypes = await containerTypeActions.getAll();
	const flattenedLots = flattenLots(lots as any);

	const purchaseOrders = await prisma.purchaseOrder.findMany({
		where: {
			purchaseOrderItems: {
				some: {
					itemId: item.id,
				},
			},
		},
		include: {
			supplier: true,
			user: true,
			status: true,
			paymentMethod: true,
			purchaseOrderItems: true,
		},
	});
	return (

		<div>
			<Tabs
				item={item}
				lots={flattenedLots}
				containerTypes={containerTypes}
				purchaseOrders={purchaseOrders as any}
			/>
		</div>
	);
};

export default TabsPanel;
