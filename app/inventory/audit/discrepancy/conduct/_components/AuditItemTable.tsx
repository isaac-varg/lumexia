import DataTable from "@/components/DataTable"
import { useDiscrepancyActions, useDiscrepancySelection } from "@/store/discrepancySlice"
import { auditItemColumns } from "./AuditItemColumns"
import { DiscrepancyItem } from "../_actions/getDiscrepancyItem"
import { Panels } from "@/components/Panels"
import SectionTitle from "@/components/Text/SectionTitle"
import { Filter } from "@/types/filter"
import { toFacetFilter } from "@/utils/data/toFacetFilter"

const AuditItemTable = () => {

    const { auditItems } = useDiscrepancySelection()
    const { setDiscrepancyAppMode, setSeletedItemFromApp } = useDiscrepancyActions()

    const filters: Filter[] = [
        {
            columnName: "status",
            filterLabel: "Status",
            options: toFacetFilter(auditItems, "status.id", "status.name"),
        },
    ];


    const handleRowClick = (row: DiscrepancyItem) => {

        setSeletedItemFromApp(row)
        setDiscrepancyAppMode('item')
    }

    return (
        <Panels.Root span={3}>
            <SectionTitle size="small">Audit Items</SectionTitle>
            <DataTable.Default
                data={auditItems}
                columns={auditItemColumns}
                filters={filters}
                //onRowClick={(row, method) => handleRowClick(row, method)}
                onRowClick={(row) => handleRowClick(row.original)}
                initialSortBy={[{
                    id: 'item',
                    desc: false,
                }]}
                tableStateName="discrepancyAudit"
            />

        </Panels.Root>
    )
}

export default AuditItemTable
