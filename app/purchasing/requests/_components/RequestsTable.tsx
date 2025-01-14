import React from 'react'
import { IPurchasingRequest } from '../_functions/getRequests'
import DataTable from '@/components/DataTable'
import { columns } from '../_configs/TableColumns'
import { Filter } from '@/types/filter'
import { toFacetFilter } from '@/utils/data/toFacetFilter'

const RequestsTable = ({ requests }: { requests: IPurchasingRequest[] }) => {

    if (!requests) { return false }

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
        
    }

    return (
        <div>
            <DataTable.Default
                filters={filters}
                data={requests}
                columns={columns}
                onRowClick={(row) => handleClick(row)}
            />
        </div>
    )
}

export default RequestsTable
