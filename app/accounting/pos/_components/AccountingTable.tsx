'use client'
import DataTable from "@/components/DataTable"
import { Panels } from "@/components/Panels"
import Text from "@/components/Text"
import { poAccountingColumns } from "./Columns"
import { PoWithAccounting } from "../_actions/getPoWithAccountingDetails"
import { Filter } from "@/types/filter"
import { toFacetFilter } from "@/utils/data/toFacetFilter"
import { useRouter } from "next/navigation"

const AccountingTable = ({ pos }: { pos: PoWithAccounting[] }) => {
    const router = useRouter()
    const filters: Filter[] = [
        {
            columnName: "supplier",
            filterLabel: "Supplier",
            options: toFacetFilter(pos, "supplier.id", "supplier.name"),
        },
    ];
    return (
        <Panels.Root>
            <Text.SectionTitle size="small">Purchase Orders</Text.SectionTitle>


            <DataTable.Default
                tableStateName='poAccounting'
                columns={poAccountingColumns}
                data={pos}
                filters={filters}
                onRowClick={(row) => router.push(`/accounting/pos/${row.original.referenceCode}?id=${row.original.id}`)}
            />

        </Panels.Root>
    )
}

export default AccountingTable
