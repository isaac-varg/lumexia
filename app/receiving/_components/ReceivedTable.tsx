"use client";
import { FlattenedPurchaseOrder } from "@/app/purchasing/purchase-orders/_functions/flattenPurchaseOrders";
import DataTable from "@/components/DataTable";
import React, { useMemo } from "react";
import { columns } from "../_configs/Columns";
import { useRouter } from "next/navigation";
import PageTitle from "@/components/Text/PageTitle";
import Card from "@/components/Card";
import { purchaseOrderStatuses } from "@/configs/staticRecords/purchaseOrderStatuses";
import { PurchaseOrderAll } from "@/actions/purchasing/purchaseOrders/getAll";
import { toTableFilter } from "@/utils/data/toTableFilter";
import { Filter } from "@/types/filter";

type ReceivedTableProps = {
  purchaseOrders: PurchaseOrderAll[]
};

const ReceivedTable = ({
  purchaseOrders,
}: ReceivedTableProps) => {
  const router = useRouter();

  const receivedItems = useMemo(() => {
    return purchaseOrders.filter(i => (i.status.id === purchaseOrderStatuses.received))
  }, [purchaseOrders])

  const filters: Filter[] = [
    {
      columnName: "supplierCol",
      filterLabel: "Supplier",
      options: toTableFilter(receivedItems, (i) => i.supplier.id, (i) => i.supplier.name)
    },
  ];


  const handleRowClick = (order: FlattenedPurchaseOrder) => {
    router.push(`/receiving/${order.referenceCode}?id=${order.id}`);
  };


  return (
    <div className="flex flex-col gap-6">
      <PageTitle>Received</PageTitle>



      <Card.Root>

        <DataTable.Default
          data={receivedItems}
          onRowClick={(row) => handleRowClick(row.original)}
          columns={columns}
          filters={filters}
          tableStateName="receivingRecentlyCompleted"
          initialSortBy={[{
            id: 'referenceCode',
            desc: true,
          }]}

        />
      </Card.Root>
    </div>
  );
};

export default ReceivedTable;
