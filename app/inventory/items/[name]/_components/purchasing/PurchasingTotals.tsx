import Layout from "@/components/Layout";
import { FlattenedPurchaseOrder } from "../../_functions/flattenPurchaseOrder";
import { getPurchasesTotals } from "../../_functions/getPurchasesTotals";
import Card from "@/components/Card";
import LabelDataPair from "@/components/Text/LabelDataPair";
import { Item } from "@prisma/client";
import { useEffect, useState } from "react";
import ActionButton from "@/components/ActionButton";
import { getFilteredPurchases } from "../../_functions/getFilteredPurchases";

const PurchasingTotals = ({
	purchaseOrders,
	item,
}: {
	purchaseOrders: FlattenedPurchaseOrder[];
	item: Item;
}) => {
	const purchasesTotals = getPurchasesTotals(purchaseOrders, item);
	const [dateRangeMode, setDateRangeMode] = useState<
		"yearToDate" | "lastYear" | "all"
	>("all");
	const [filteredPurchases, setFilteredPurchases] = useState(purchasesTotals);
	const [quantityTotal, setQuantityTotal] = useState(0);

	const totalCount = filteredPurchases.reduce(
		(acc: number, curr: any) => acc + curr.count,
		0,
	);

	useEffect(() => {
		const filtered = getFilteredPurchases(purchasesTotals, dateRangeMode);
		console.log('ran')
		setFilteredPurchases(filtered);

		setQuantityTotal(
			filtered.reduce((acc: number, curr: any) => acc + curr.totalQuantity, 0),
		);
	}, [dateRangeMode, purchasesTotals, filteredPurchases]);


	return (
		<div>
			<Layout.Row>
				<ActionButton onClick={() => setDateRangeMode("all")}>All</ActionButton>
				<ActionButton onClick={() => setDateRangeMode("yearToDate")}>
					This Year
				</ActionButton>
				<ActionButton onClick={() => setDateRangeMode("lastYear")}>
					Last Year
				</ActionButton>
			</Layout.Row>
			<Layout.Grid>
				<Card.Root>
					<h2 className="font-semibold text-base font-poppins uppercase">
						PO Count
					</h2>
					{filteredPurchases.map((po: any) => {
						const { supplierId, name, count } = po;

						return <LabelDataPair key={supplierId} label={name} data={count} />;
					})}
					<LabelDataPair label="Total" data={totalCount} />
				</Card.Root>
				<Card.Root>
					<h2 className="font-semibold text-base font-poppins uppercase">
						Quantity Ordered
					</h2>
					{filteredPurchases.map((po: any) => {
						const { supplierId, name, totalQuantity } = po;

						return (
							<LabelDataPair
								key={supplierId}
								label={name}
								data={`${totalQuantity} lbs`}
							/>
						);
					})}
					<LabelDataPair label="Total" data={`${quantityTotal} lbs`} />
				</Card.Root>
			</Layout.Grid>
		</div>
	);
};

export default PurchasingTotals;
