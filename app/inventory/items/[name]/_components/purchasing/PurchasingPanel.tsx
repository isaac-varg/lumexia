import DataTable from "@/components/DataTable";
import { PurchaseOrderStatus } from "@/types/purchaseOrderStatus";
import React from "react";
import { purchaseOrderColumns } from "../../_configs/PurchaseOrderColumns";
import { flattenPurchaseOrders } from "../../_functions/flattenPurchaseOrder";
import { Filter } from "@/types/filter";
import {
  RowSelectionHandlerMethod,
  rowSelectionHandler,
} from "@/utils/auxiliary/rowSelectionHandler";
import { toFacetFilter } from "@/utils/data/toFacetFilter";
import { useRouter } from "next/navigation";

type PurchasingPanelType = {
  purchaseOrders: any; // wow
};

const PurchasingPanel = ({ purchaseOrders }: PurchasingPanelType) => {
  const flattenedPurchaseOrders = flattenPurchaseOrders(purchaseOrders);
  const router = useRouter();
  const handleRowClick = (row: any, method: RowSelectionHandlerMethod) => {
    const path = `/purchasing/purchase-orders/${row.original.referenceCode}?id=${row.original.id}`;
    rowSelectionHandler(method, path, router);
  };

  const filters: Filter[] = [
    {
      columnName: "supplierName",
      filterLabel: "Supplier",
      options: toFacetFilter(flattenedPurchaseOrders, "supplierName", "supplierName"),
    },
    {
      columnName: "statusName",
      filterLabel: "Status",
      options: toFacetFilter(flattenedPurchaseOrders, "statusName", "statusName"),
    },
  ];
  return (
    <div>
      <DataTable.Default
        data={flattenedPurchaseOrders}
        columns={purchaseOrderColumns}
        filters={filters}
        onRowClick={(row, method) => handleRowClick(row, method)}
      />
    </div>
  );
};

export default PurchasingPanel;
