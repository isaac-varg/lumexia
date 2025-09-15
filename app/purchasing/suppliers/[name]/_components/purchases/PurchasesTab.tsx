"use client";

import DataTable from "@/components/DataTable";
import { purchasesColumns } from "./Columns";
import { SupplierDetailPurchases } from "../../_actions/getPurchases";
import TotalMetrics from "./TotalMetrics";
import Card from "@/components/Card";
import {
  RowSelectionHandlerMethod,
  rowSelectionHandler,
} from "@/utils/auxiliary/rowSelectionHandler";
import { useRouter } from "next/navigation";

const PurchasesTab = ({
  purchases,
}: {
  purchases: SupplierDetailPurchases[];
}) => {
  const router = useRouter();

  const handleClick = (row: any, method: RowSelectionHandlerMethod) => {
    const path = `/purchasing/purchase-orders/${row.original.referenceCode}?id=${row.original.id}`;
    rowSelectionHandler(method, path, router);
  };

  return (
    <div className="p-4 flex flex-col gap-y-4">
      <TotalMetrics purchases={purchases} />
      <Card.Root bg="elevated" shadow='none'>
        <DataTable.Default
          data={purchases}
          columns={purchasesColumns}
          onRowClick={(row) => handleClick(row, 'rowClick')}
          tableStateName="supplierDetailsPurchasesTab"
          initialSortBy={[{
            id: 'referenceCode',
            desc: true,
          }]}
        />
      </Card.Root>
    </div>
  );
};

export default PurchasesTab;
