import { FilterFn } from "@tanstack/react-table";

export const FilterFunction: FilterFn<any> = (row, columnId, filterValue) => {
  // Safety check: if filter is not an array, likely no filter applied
  if (!Array.isArray(filterValue) || filterValue.length === 0) {
    return true;
  }

  const cellValue = row.getValue(columnId);
  return filterValue.includes(cellValue);
};
