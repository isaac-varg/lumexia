"use client";
import DataTable from "@/components/DataTable";
import { columns } from "./Columns";
import { Item } from "@/types/item";
import { Filter } from "@/types/filter";
import { toFacetFilter } from "@/utils/data/toFacetFilter";
import { useRouter } from "next/navigation";
import { flattenItem } from "../_functions/flattenItem";

type TableProps = {
  items: Item[];
};

const Table = ({ items }: TableProps) => {

  const router = useRouter();

  const tableData =  flattenItem(items);

  const handleRowClick = (row: any) => {
    const formattedName = row.original.name.replace(/\s+/g, '-').toLowerCase();
    router.push(
      `/inventory/items/${`${formattedName}?id=${row.original.id}`} `
    );
  };

  const filters: Filter[] = [

    {
      columnName: "itemTypeName",
      filterLabel: "Item Type",
      options: toFacetFilter(tableData, "itemTypeName", "itemTypeName"),
    },

  ];

  return (
    <DataTable.Default
      data={tableData}
      columns={columns}
      filters={filters}
      dialogIdentifier="createItem"
      onRowClick={(row) => handleRowClick(row)}
    />
  );
};

export default Table;
