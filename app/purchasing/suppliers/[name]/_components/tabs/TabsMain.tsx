import prisma from "@/lib/prisma";
import { Supplier } from "@/types/supplier";
import TabsContent from "./TabsContent";
import { getPurchases } from "../../_actions/getPurchases";

const TabsMain = async ({ supplier }: { supplier: Supplier }) => {
	const materials = await prisma.purchaseOrderItem.findMany({
		where: {
			purchaseOrders: {
				supplierId: supplier.id,
			},
		},
		distinct: ["itemId"],
		include: {
			purchaseOrders: true,
			item: true,
		},
	});

	const purchases = await getPurchases(supplier.id);
	console.log(purchases);

	return (
		<div>
			<TabsContent  purchases={purchases}/>
		</div>
	);
};

export default TabsMain;
