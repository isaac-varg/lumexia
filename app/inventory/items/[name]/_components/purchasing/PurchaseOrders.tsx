import SectionTitle from "@/components/Text/SectionTitle"
import { useItemSelection } from "@/store/itemSlice"
import { Filter } from "@/types/filter"
import { RowSelectionHandlerMethod, rowSelectionHandler } from "@/utils/auxiliary/rowSelectionHandler"
import { toFacetFilter } from "@/utils/data/toFacetFilter"
import { useRouter } from "next/navigation"
import { purchaseOrderColumns } from "./PurchaseOrderColumns"
import DataTable from "@/components/DataTable"
import Card from "@/components/Card"

const PurchaseOrders = () => {

  const { purchaseOrders } = useItemSelection()
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
    const path = `/purchasing/purchase-orders/${row.original.referenceCode}?id=${row.original.purchaseOrders.id}`;
    rowSelectionHandler(method, path, router);
  };

  return (

    <div className="flex flex-col gap-4">
      <SectionTitle>Purchase Orders</SectionTitle>


      <Card.Root>
        <DataTable.Default
          data={purchaseOrders}
          searchBg="elevated"
          columns={purchaseOrderColumns}
          filters={filters}
          onRowClick={(row, method) => handleRowClick(row, method)}
          initialSortBy={[{
            id: 'referenceCode',
            desc: true,
          }]}
          tableStateName="accountingActivity"
        />

      </Card.Root>
    </div>
  )
}

export default PurchaseOrders
