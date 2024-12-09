import DataTable from '@/components/DataTable'
import { BatchProductionRecord } from '@/types/batchProductionRecord'
import { Filter } from '@/types/filter'
import { toFacetFilter } from '@/utils/data/toFacetFilter'
import React from 'react'
import { columns } from './Columns'
import { PlanningIBpr } from '../../_functions/getBprs'
import { useRouter } from 'next/navigation'

type ListModeProps = {
    bprs: PlanningIBpr[]
}

const ListMode = ({ bprs }: ListModeProps) => {

    const router = useRouter()
    const handleClick = (row: PlanningIBpr) => {
        const { referenceCode, id} = row;
        router.push(`/production/planning/${referenceCode}?id=${id}`)
    }



    const filters: Filter[] = [
        {
            columnName: "producedItemName",
            filterLabel: "Item",
            options: toFacetFilter(bprs, "producedItemName", "producedItemName"),
        },
        {
            columnName: "bprStatusName",
            filterLabel: "Status",
            options: toFacetFilter(bprs, "bprStatusName", "bprStatusName"),
        },

    ];

    return (
        <div>
            <DataTable.Default
                data={bprs}
                filters={filters}
                columns={columns}
                onRowClick={(row) => handleClick(row.original)}

            />
        </div>
    )
}

export default ListMode
