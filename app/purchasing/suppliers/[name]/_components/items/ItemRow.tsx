import React from "react";
import { SupplierDetailsItems } from "../../_actions/getItems";

const ItemRow = ({
	item,
	onClick,
  selectedItemId,
}: {
	item: SupplierDetailsItems;
	onClick: (item: SupplierDetailsItems) => void;
  selectedItemId: string | null | undefined
}) => {
  const isSelected = selectedItemId === item.id;
	return (
		<div className={`flex gap-x-2 border hover:bg-cararra-300 hover:border-cararra-500 text-neutral-700 py-2 px-4 rounded-lg ${isSelected ? 'bg-cararra-300 border-cararra-400' : 'border-cararra-200 bg-cararra-100'} `} onClick={() => onClick(item)}>
			<span className="font-poppins text-lg">{item.item.name}</span>
		</div>
	);
};

export default ItemRow;
