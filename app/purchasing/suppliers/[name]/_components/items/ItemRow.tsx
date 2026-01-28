import React from "react";
import { SupplierDetailsItems } from "../../_actions/getItems";

const ItemRow = ({
  item,
  onClick,
  selectedItemId,
}: {
  item: SupplierDetailsItems;
  onClick: (item: SupplierDetailsItems) => void;
  selectedItemId: string | null | undefined;
}) => {
  const isSelected = selectedItemId === item.id;
  return (
    <div
      onClick={() => onClick(item)}
      className={`flex gap-x-2 py-3 px-4 rounded-lg cursor-pointer transition-colors border-2 ${
        isSelected
          ? "bg-cararra-100 border-cararra-300"
          : "border-transparent hover:bg-cararra-50"
      }`}
    >
      <span className="font-poppins text-lg">{item.item.name}</span>
    </div>
  );
};

export default ItemRow;
