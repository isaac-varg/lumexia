import Layout from "@/components/Layout";
import { ExPurchaseOrderItem } from "@/types/purchaseOrderItem";
import React from "react";
import LineItemCard from "./LineItemCard";
import SectionTitle from "@/components/Text/SectionTitle";

type LineItemPanelsProps = {
	items: ExPurchaseOrderItem[];
};

// TODO have configuration for this rather than hard code
const statusSequences = {
	awaitingDelivery: 3,
	received: 4,
	partiallyReceived: 5,
};

const LineItemPanels = ({ items }: LineItemPanelsProps) => {
	const awaiting = items.filter(
		(item) =>
			item.purchaseOrderStatus.sequence === statusSequences.awaitingDelivery,
	);
	const partial = items.filter(
		(item) =>
			item.purchaseOrderStatus.sequence === statusSequences.partiallyReceived,
	);
	const received = items.filter(
		(item) => item.purchaseOrderStatus.sequence === statusSequences.received,
	);

	return (
		<div className="flex flex-col gap-y-4">
			<Layout.Panel>
				<SectionTitle>Awaiting Delivery</SectionTitle>
				<Layout.Grid cols={3} gap={4}>
					{awaiting.map((item: ExPurchaseOrderItem) => (
						<LineItemCard key={item.id} item={item} />
					))}
				</Layout.Grid>
			</Layout.Panel>

			<Layout.Panel bg="linen">
				<SectionTitle>Partially Received</SectionTitle>

				<Layout.Grid cols={3} gap={4}>
					{partial.map((item: ExPurchaseOrderItem) => (
						<LineItemCard key={item.id} item={item} />
					))}
				</Layout.Grid>
			</Layout.Panel>

			<Layout.Panel bg="bayLeaf">
				<SectionTitle>Received </SectionTitle>

				<Layout.Grid cols={3} gap={4}>
					{received.map((item: ExPurchaseOrderItem) => (
						<LineItemCard key={item.id} item={item} />
					))}
				</Layout.Grid>
			</Layout.Panel>
		</div>
	);
};
export default LineItemPanels;
