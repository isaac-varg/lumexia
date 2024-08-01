"use client";
import TabsPanel from "@/components/Tabs";
import PurchasesTab from "../purchases/PurchasesTab";
import { SupplierDetailPurchases } from "../../_actions/getPurchases";
import { PurchaseOrderItem } from "@/types/purchaseOrderItem";
import ItemsTab from "../items/ItemsTab";
import { SupplierDetailsItems } from "../../_actions/getItems";

const tabs = [
	{ identifier: "purchases", label: "Purchases" },
	{ identifier: "items", label: "Items" },
];

const TabsContent = ({
	purchases,
	items,
}: {
	purchases: SupplierDetailPurchases[];
	items: SupplierDetailsItems[];
}) => {
	return (
		<TabsPanel.Root defaultTabIdentifier="purchases">
			<TabsPanel.List tabTriggers={tabs} />

			<TabsPanel.Content identifier="purchases">
				<PurchasesTab purchases={purchases} />
			</TabsPanel.Content>

			<TabsPanel.Content identifier="items">
				<ItemsTab items={items} />
			</TabsPanel.Content>
		</TabsPanel.Root>
	);
};

export default TabsContent;
