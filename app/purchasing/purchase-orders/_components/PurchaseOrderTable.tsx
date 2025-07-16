"use client";

import DataTable from "@/components/DataTable";
import { FlattenedPurchaseOrder } from "../_functions/flattenPurchaseOrders";
import { purchaseOrderColumns } from "../_configs/purchaseOrderColumns";
import { toFacetFilter } from "@/utils/data/toFacetFilter";
import { Filter } from "@/types/filter";
import { useRouter } from "next/navigation";
import Motions from "@/components/Motions";
import { RowSelectionHandlerMethod, rowSelectionHandler } from "@/utils/auxiliary/rowSelectionHandler";
import { DashboardPurchaseOrder } from "../_functions/getPurchaseOrders";

const PurchaseOrderTable = ({
    purchaseOrders,
}: {
    purchaseOrders: DashboardPurchaseOrder[];
}) => {

    const router = useRouter();
    const handleRowClick = (row: any, method: RowSelectionHandlerMethod) => {
        const path = `/purchasing/purchase-orders/${row.original.referenceCode}?id=${row.original.id}`
        rowSelectionHandler(method, path, router)
    };


    const filters: Filter[] = [
        {
            columnName: "supplier",
            filterLabel: "Supplier",
            options: toFacetFilter(purchaseOrders, "supplier.id", "supplier.name"),
        },
        {
            columnName: "status",
            filterLabel: "Status",
            options: toFacetFilter(purchaseOrders, "status.id", "status.name"),
        },
        {
            columnName: "accounting",
            filterLabel: "Accounting",
            options: toFacetFilter(purchaseOrders, "poAccountingDetail.status.id", "poAccountingDetail.status.name"),
        },

    ];

    return (
        <div>
            <Motions.NewDialog dialogIdentifier="createPurchaseOrder" />
            <DataTable.Default
                data={purchaseOrders}
                columns={purchaseOrderColumns}
                dialogIdentifier="createPurchaseOrder"
                filters={filters}
                onRowClick={(row, method) => handleRowClick(row, method)}
                actionButtonTitle="New Purchase Order"
                tableStateName="pos"
            />
        </div>
    );
};

export default PurchaseOrderTable;
