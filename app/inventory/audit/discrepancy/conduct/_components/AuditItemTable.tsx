import DataTable from "@/components/DataTable"
import { useDiscrepancySelection } from "@/store/discrepancySlice"
import { auditItemColumns } from "./AuditItemColumns"
import { DiscrepancyItem } from "../_actions/getDiscrepancyItem"
import { RowSelectionHandlerMethod } from "@/utils/auxiliary/rowSelectionHandler"
import { Panels } from "@/components/Panels"
import SectionTitle from "@/components/Text/SectionTitle"

const AuditItemTable = () => {

    const { auditItems } = useDiscrepancySelection()

    //    const filters: Filter[] = [
    //        {
    //            columnName: "supplierName",
    //            filterLabel: "Supplier",
    //            options: toFacetFilter(purchaseOrders, "supplierName", "supplierName"),
    //        },
    //        {
    //            columnName: "statusName",
    //            filterLabel: "Status",
    //            options: toFacetFilter(purchaseOrders, "statusName", "statusName"),
    //        },
    //    ];
    //

    const handleRowClick = (row: DiscrepancyItem) => {

        console.log(row)
    }

    return (
        <Panels.Root>
            <SectionTitle size="small">Audit Items</SectionTitle>
            <DataTable.Default
                data={auditItems}
                columns={auditItemColumns}
                filters={[]}
                //onRowClick={(row, method) => handleRowClick(row, method)}
                onRowClick={(row) => handleRowClick(row.original)}
                initialSortBy={[{
                    id: 'referenceCode',
                    desc: true,
                }]}
                tableStateName="discrepancyAudit"
            />

        </Panels.Root>
    )
}

export default AuditItemTable
