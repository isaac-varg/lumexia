import Card from "@/components/Card";
import LabelDataPair from "@/components/Text/LabelDataPair";
import { PurchaseOrderItem } from "@/types/purchaseOrderItem";
import { ExPurchaseOrderItem } from "@/types/purchaseOrderItem";
import React from "react";
type LineItemCardProps = {
	item: ExPurchaseOrderItem;
};
const LineItemCard = ({ item }: LineItemCardProps) => {
	return (
		<Card.Root bg="neutral" shadow="none">
			<Card.Title>{item.item.name}</Card.Title>

			<LabelDataPair
				label="Quantity"
				data={`${item.quantity} ${item.uom.abbreviation}`}
			/>
		</Card.Root>
	);
};

export default LineItemCard;
