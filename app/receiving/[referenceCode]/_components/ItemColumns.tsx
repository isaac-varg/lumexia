import { PurchaseOrderItem } from "@/actions/purchasing/purchaseOrders/items/getAll";
import { toFracitonalDigits } from "@/utils/data/toFractionalDigits";
import { createColumnHelper } from "@tanstack/react-table";
import { MouseEvent } from "react";

const columnHelper = createColumnHelper<PurchaseOrderItem>();

type Params = {
  onConversionErrorClick: (item: PurchaseOrderItem) => void;
}

export const getItemColumns = ({ onConversionErrorClick }: Params) => [
  columnHelper.accessor('item.name', {
    header: 'Item Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('quantity', {
    header: 'Quantity',
    cell: info => `${toFracitonalDigits.weight(info.row.original.quantity)} ${info.row.original.uom.abbreviation}`
  }),
  columnHelper.accessor('hasConversionError', {
    header: '',
    cell: info => {
      if (info.row.original.hasConversionError) {
        const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          onConversionErrorClick(info.row.original);
        }
        return (
          <button
            onClick={handleClick}
            className="btn btn-md btn-error"
          >
            Conversion Error
          </button>
        )
      }
    }
  })
]
