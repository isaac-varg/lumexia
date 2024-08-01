import React, { useEffect, useState } from "react";
import { SupplierDetailsItems } from "../../_actions/getItems";
import Card from "@/components/Card";
import ItemRow from "./ItemRow";
import { SupplierDetailPurchases } from "../../_actions/getPurchases";
import { getFilteredItems } from "../../_actions/getFilteredItems";

const ItemsTab = ({
	items,
}: {
	items: SupplierDetailsItems[];
}) => {
	const [selectedItem, setSelectedItem] = useState<SupplierDetailsItems | null>();

	const [itemData, setItemData] = useState<any>(null); 

	const handleItemClick = (item: SupplierDetailsItems) => {
		setSelectedItem(item);
	};

	useEffect(() => {
		if (!selectedItem) return;

		const fetchData = async () => {
			try {
				const data = await getFilteredItems(selectedItem.item.id, selectedItem.purchaseOrders.supplierId);
				setItemData(data);
				console.log(data);
			} catch (error) {
				console.error("Error fetching item data:", error);
			}
		};

		fetchData();
	}, [selectedItem]);

	return (
		<div className="flex gap-x-4">
			<div className="w-1/3">
				<Card.Root>
					<Card.Title size="small">Items Supplied</Card.Title>
					{items.map((item) => (
						<ItemRow key={item.id} item={item} onClick={handleItemClick} />
					))}
				</Card.Root>
			</div>
			<div className="w-full">
				<Card.Root>hey hey </Card.Root>
			</div>
		</div>
	);
};

export default ItemsTab;
