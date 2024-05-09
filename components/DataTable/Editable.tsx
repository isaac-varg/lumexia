import { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FlattenedOrderItem } from "@/app/purchasing/purchase-orders/[purchaseOrder]/_functions/flattenOrderItems";
import { FooterCell } from "./FooterCell";
import purchaseOrderItemActions from "@/actions/purchasing/purchaseOrderItemActions";

type EditableProps = {
  data: any;
  columns: any;
  onRowClick: (row: any) => void;
};

const Editable = ({ data, columns, onRowClick }: EditableProps) => {
  const [editedRows, setEditedRows] = useState({});
  const [tableData, setTableData] = useState<FlattenedOrderItem[]>([...data]);
  const [originalData, setOriginalData] = useState<FlattenedOrderItem[]>([
    ...data,
  ]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex: number, columnId: string, value: any) => {
        setTableData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
      editedRows,
      setEditedRows,
      revertData: (rowIndex: number, revert: boolean) => {
        if (revert) {
          setTableData((old) =>
            old.map((row, index) =>
              index === rowIndex ? originalData[rowIndex] : row
            )
          );
        } else {
          // setOriginalData((old) =>
          //   old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
          // );
          
          const wth = tableData[rowIndex].quantity as any

          const updateData = {
            pricePerUnit: tableData[rowIndex].pricePerUnit,
            quantity: parseFloat(wth),

          }

          purchaseOrderItemActions.update({id: tableData[rowIndex].id}, updateData)
        }
      },
      addRow: () => {
        const newRow: any = {
          itemReferenceCode: "",
          itemName: "",
          pricePerUnit: 0,
          quantity: 0,
          uomAbbreviation: "",
        };

        const setter = (old: FlattenedOrderItem[]) => [...old, newRow];

        setTableData(setter);
        setOriginalData(setter);
      },
      removeRow: (rowIndex: number) => {
        const setter = (old: FlattenedOrderItem[]) =>
          old.filter((_row: any, index: number) => index !== rowIndex);
        setTableData(setter);
        setOriginalData(setter);

        purchaseOrderItemActions.deleteOne({id: tableData[rowIndex].id})
      },
    },
  });
  return (
    <div className="flex flex-col gap-y-6">
      <div className="w-full">
        <table className="min-w-full text-left text-lg font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                onClick={() => onRowClick(row)}
                key={row.id}
                className="border-b dark:border-neutral-500"
              >
                {row.getVisibleCells().map((cell) => (
                  <td className="py-4" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>
                <FooterCell table={table} />
              </th>
            </tr>
            </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Editable;
