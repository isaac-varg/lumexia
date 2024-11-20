import DataTable from "@/components/DataTable";
import { purchaseOrderColumns } from "../../_configs/PurchaseOrderColumns";
import {
  RowSelectionHandlerMethod,
  rowSelectionHandler,
} from "@/utils/auxiliary/rowSelectionHandler";
import { toFacetFilter } from "@/utils/data/toFacetFilter";

import { FlattenedPurchaseOrder } from "../../_functions/flattenPurchaseOrder";
import { Filter } from "@/types/filter";
import { useRouter } from "next/navigation";

const PurchasesTable = ({
  purchaseOrders,
}: {
  purchaseOrders: FlattenedPurchaseOrder[];
}) => {
  const router = useRouter();
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

  const handleRowClick = (row: any, method: RowSelectionHandlerMethod) => {
    const path = `/purchasing/purchase-orders/${row.original.referenceCode}?id=${row.original.id}`;
    rowSelectionHandler(method, path, router);
  };
  return (
    <div>
      <DataTable.Default
        data={purchaseOrders}
        columns={purchaseOrderColumns}
        filters={filters}
        onRowClick={(row, method) => handleRowClick(row, method)}
        initialSortBy={[{
            id: 'referenceCode',
            desc: true,
        }]}
      />
    </div>
  );
};

export default PurchasesTable;
