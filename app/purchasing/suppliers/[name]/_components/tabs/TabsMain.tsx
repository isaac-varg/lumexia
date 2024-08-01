import { Supplier } from "@/types/supplier";
import TabsContent from "./TabsContent";
import { getPurchases } from "../../_actions/getPurchases";
import { SupplierDetailsItems, getItems } from "../../_actions/getItems";

const TabsMain = async ({ supplier }: { supplier: Supplier }) => {
	const items = await getItems(supplier.id);

	const purchases = await getPurchases(supplier.id);

	return (
		<div>
			<TabsContent purchases={purchases} items={items as SupplierDetailsItems[]} />
		</div>
	);
};

export default TabsMain;


