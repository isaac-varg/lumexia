"use client";

import { toFracitonalDigits } from "@/utils/data/toFractionalDigits";
// This handles the table cell component for an editable component.
// It pulls functions from the Editable table core via the meta prop

import { useEffect, useState } from "react";

const TableCell = ({
  getValue,
  row,
  column,
  table,
}: {
  getValue: () => any;
  row: any;
  column: any;
  table: any;
}) => {
  const initialValue = getValue();
  const tableMeta = table.options.meta;
  const columnMeta = column.columnDef.meta;

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, toFracitonalDigits.digits(parseFloat(value), fractionalDigits));
  };
  
  const fractionalDigits = column.columnDef.meta?.valueType || 3


  if (tableMeta?.editedRows[row.id]) {
    return (
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        type={column.columnDef.meta?.type || "text"}
        className="bg-cararra-100 px-2 py-1 rounded-lg"
      />
    );
  }

  return <span>{toFracitonalDigits.digits(parseFloat(value), fractionalDigits)}</span>
};

export default TableCell;
