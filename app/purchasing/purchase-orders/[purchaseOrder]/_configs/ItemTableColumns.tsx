import TableCell from "@/components/DataTable/TableCell";
import { createColumnHelper } from "@tanstack/react-table";
import { FlattenedOrderItem } from "../_functions/flattenOrderItems";
import { EditCell } from "@/components/DataTable/EditCell";
import EditableSelectCell from "@/components/DataTable/SelectCell";
import { getUOMs } from "../_functions/getUOMs";
import { toFracitonalDigits } from "@/utils/data/toFractionalDigits";

export interface PurchaseOrderItemTData {
  itemReferenceCode: string;
  itemName: string;
  pricePerUnit: number;
  quantity: number;
  uomAbbreviation: string;
}

const columnHelper = createColumnHelper<FlattenedOrderItem>();

const getSelectOptions = async () => {
  const result = await getUOMs();
  return result.map((uom: any) => ({
    value: uom.id,
    label: uom.abbreviation,
  }));
};

const createColumns = async () => {
  const uomOptions = await getSelectOptions();

  return [
    columnHelper.accessor("itemReferenceCode", {
      header: "IID",
    }),
    columnHelper.accessor("itemName", {
      header: "Item",
      cell: (props) => {

          if (props.row.original.alias) {
              return props.row.original.alias;
          }

          return props.row.original.item.name;
      }
    }),
    columnHelper.accessor("pricePerUnit", {
      header: "Price",
      cell: TableCell,
      meta: {
        type: "number",
      },
    }),
    columnHelper.accessor("quantity", {
      header: "Qty",
      cell: TableCell,
      meta: {
        type: "number",
      },
    }),
    columnHelper.accessor("uomId", {
      header: "UOM",
      cell: EditableSelectCell,
      meta: {
        options: uomOptions,
      },
    }),
    columnHelper.display({
      id: "total",
      cell: (props) => {
        return toFracitonalDigits.curreny(props.row.original.pricePerUnit * props.row.original.quantity);
      },
      header: "Total",
    }),
    columnHelper.display({
      id: "edit",
      cell: EditCell,
    }),
  ];
};

export default createColumns;
