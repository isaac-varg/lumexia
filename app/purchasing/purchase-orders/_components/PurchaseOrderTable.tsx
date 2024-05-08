"use client";

import DataTable from "@/components/DataTable";
import { FlattenedPurchaseOrder } from "../_functions/flattenPurchaseOrders";
import { purchaseOrderColumns } from "../_configs/purchaseOrderColumns";
import { toFacetFilter } from "@/utils/data/toFacetFilter";
import { Filter } from "@/types/filter";
import { useRouter } from "next/navigation";

const PurchaseOrderTable = ({
  purchaseOrders,
}: {
  purchaseOrders: FlattenedPurchaseOrder[];
}) => {
  const router = useRouter();
  const handleRowClick = (row: any) => {
    router.push(`/purchasing/purchase-orders/${row.original.referenceCode}?id=${row.original.id}`)
  };

  const filters: Filter[] = [
    {
      columnName: "supplierName",
      filterLabel: "Supplier",
      options: toFacetFilter(purchaseOrders, "supplierName", "supplierName"),
    },
    {
      columnName: "statusName",
      filterLabel: "Status",
      options: toFacetFilter(purchaseOrders, "statusName", "statusName"),
    },
  ];
  return (
    <div>
      <DataTable.Default
        data={purchaseOrders}
        columns={purchaseOrderColumns}
        // dialogIdentifier="createPurchaseOrder"
        filters={filters}
        onRowClick={(row) => handleRowClick(row)}
      />
    </div>
  );
};

export default PurchaseOrderTable;
