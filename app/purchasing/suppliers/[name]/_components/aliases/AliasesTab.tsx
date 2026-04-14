"use client";

import DataTable from "@/components/DataTable";
import Card from "@/components/Card";
import SectionTitle from "@/components/Text/SectionTitle";
import {
  RowSelectionHandlerMethod,
  rowSelectionHandler,
} from "@/utils/auxiliary/rowSelectionHandler";
import { useRouter } from "next/navigation";
import { useSupplierDetailSelection } from "@/store/supplierDetailSlice";
import { SupplierAliasDetails } from "../../_actions/getAliases";
import { createColumnHelper } from "@tanstack/react-table";
import { SortableHeaderType } from "@/components/DataTable/SortableHeaderType";
import Tag from "@/components/Text/Tag";
import { getSlug } from "@/utils/general/getSlug";

const columnHelper = createColumnHelper<SupplierAliasDetails>();

const columns = [
  columnHelper.accessor("name", {
    header: SortableHeaderType("Alias Name"),
  }),
  columnHelper.accessor("item.name", {
    header: SortableHeaderType("Item Name"),
  }),
  columnHelper.accessor("item.referenceCode", {
    header: SortableHeaderType("Item Code"),
  }),
  columnHelper.accessor("aliasType.name", {
    header: SortableHeaderType("Alias Type"),
    cell: (info) => {
      const type = info.getValue();
      return <Tag label={type} bgColor="bg-cararra-100" textColor="text-neutral-800" />;
    },
  }),
];

const AliasesTab = () => {
  const { aliases } = useSupplierDetailSelection();
  const router = useRouter();

  const handleClick = (row: any, method: RowSelectionHandlerMethod) => {
    const item = row.original.item;
    const path = `/inventory/items/${getSlug(item.name)}?id=${item.id}`;
    rowSelectionHandler(method, path, router);
  };

  return (
    <div className="flex flex-col gap-6">
      <SectionTitle>Item Aliases</SectionTitle>

      <Card.Root>
        <DataTable.Default
          data={aliases}
          columns={columns}
          onRowClick={(row) => handleClick(row, "rowClick")}
          tableStateName="supplierDetailsAliasesTab"
          initialSortBy={[{
            id: "name",
            desc: false,
          }]}
        />
      </Card.Root>
    </div>
  );
};

export default AliasesTab;
