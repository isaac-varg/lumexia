"use client";
import DataTable from "@/components/DataTable";
import { columns } from "./Columns";
import { Item } from "@/types/item";
import { Filter } from "@/types/filter";
import { toFacetFilter } from "@/utils/data/toFacetFilter";

type TableProps = {
  items: Item[];
};

const Table = ({ items }: TableProps) => {

  const filters: Filter[] = [
    {
      columnName: "procurementType",
      filterLabel: "Procurement Type",
      options: toFacetFilter(
        items,
        "procurementType.id",
        "procurementType.name"
      ),
    },
    {
      columnName: "itemType",
      filterLabel: "Item Type",
      options: toFacetFilter(
        items,
        "itemType.id",
        "itemType.name"
      ),
    },
    {
      columnName: "inventoryType",
      filterLabel: "Inventory Type",
      options: toFacetFilter(
        items,
        "inventoryType.id",
        "inventoryType.name"
      ),
    },
  ];

  return (
    <DataTable.Default
      data={items}
      columns={columns}
      filters={filters}
      dialogIdentifier="createItem"
      onRowClick={(row) => console.log(row)}
    />
  );
};

export default Table;
