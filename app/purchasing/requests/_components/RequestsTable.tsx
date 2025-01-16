import React from 'react'
import { IPurchasingRequest } from '../_functions/getRequests'
import DataTable from '@/components/DataTable'
import { columns } from '../_configs/TableColumns'
import { Filter } from '@/types/filter'
import { toFacetFilter } from '@/utils/data/toFacetFilter'
import { useRouter } from 'next/navigation'

const RequestsTable = ({ requests }: { requests: IPurchasingRequest[] }) => {

    if (!requests) { return false }

    const router = useRouter()

    const filters: Filter[] = [
        {
            columnName: "statusName",
            filterLabel: "Status",
            options: toFacetFilter(requests, "statusName", "statusName"),
        },
        {
            columnName: "priorityName",
            filterLabel: "Priority",
            options: toFacetFilter(requests, "priorityName", "priorityName"),

        }

    ];



    const handleClick = (row: any) => {
        router.push(`/purchasing/requests/${row.original.referenceCode}?id=${row.original.id}`)
    }

    return (
        <div>
            <DataTable.Default
                filters={filters}
                data={requests}
                columns={columns}
                onRowClick={(row) => handleClick(row)}
                tableStateName='poRequests'
            />
        </div>
    )
}

export default RequestsTable
