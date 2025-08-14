import React from "react";
import Tabs from "./Tabs";
import { Item } from "@/types/item";
import { flattenLots } from "../_functions/flattenLots";
import lotActions from "@/actions/inventory/lotActions";
import containerTypeActions from "@/actions/inventory/containerTypeActions";
import { getBomUsage } from "../_functions/getBomUsage";
import { getPurchaseOrders } from "../_functions/getPurchaseOrders";
import { getItemPricingData } from "@/actions/accounting/pricing/getItemPricingData";
import { getAllUom } from "@/actions/inventory/getAllUom";

const TabsPanel = async ({ item }: { item: Item }) => {
	const lots = await lotActions.getByItem(item.id);
	const containerTypes = await containerTypeActions.getAll();
	const flattenedLots = flattenLots(lots as any);
    const pricing = await getItemPricingData(item.id)

    const uom = await getAllUom()
	const purchaseOrders = await  getPurchaseOrders(item.id)

    const usage = await getBomUsage(item.id)


	return (
		<div>
			<Tabs
				item={item}
				lots={flattenedLots}
				containerTypes={containerTypes}
				purchaseOrders={purchaseOrders as any}
                usage={usage}
                pricing={pricing}
                uom={uom}
			/>
		</div>
	);
};

export default TabsPanel;
