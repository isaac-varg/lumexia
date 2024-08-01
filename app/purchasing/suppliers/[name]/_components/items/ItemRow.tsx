import React from "react";
import { SupplierDetailsItems } from "../../_actions/getItems";

const ItemRow = ({
	item,
	onClick,
}: {
	item: SupplierDetailsItems;
	onClick: (item: SupplierDetailsItems) => void;
}) => {
	return (
		<div className="flex gap-x-2 bg-cararra-200 border border-cararra-300 hover:bg-cararra-300 hover:border-cararra-500 text-neutral-700 py-2 px-4 rounded-lg" onClick={() => onClick(item)}>
			<span className="font-poppins text-lg">{item.item.name}</span>
		</div>
	);
};

export default ItemRow;
