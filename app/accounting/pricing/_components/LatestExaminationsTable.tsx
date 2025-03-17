'use client'
import { PricingExaminationAll } from '@/actions/accounting/examinations/getAll'
import DataTable from '@/components/DataTable'
import React from 'react'
import { latestExaminationsColumns } from './LatestExaminationsColumns'
import { Filter } from '@/types/filter'
import { toFacetFilter } from '@/utils/data/toFacetFilter'

const LatestExaminationsTable = ({ examinations }: { examinations: PricingExaminationAll[] }) => {

    const filters: Filter[] = [
        {
            columnName: "examinedItem.id",
            filterLabel: "Item",
            options: toFacetFilter(examinations, "examinedItem.id", "examinedItem.name"),
        },
    ]

    return (
        <div>
            <DataTable.Default
            tableStateName='latestPricingExaminationsAll'
                columns={latestExaminationsColumns}
                data={examinations}
                filters={filters}
                onRowClick={(row) => console.log(row)}
            />
        </div>
    )
}

export default LatestExaminationsTable
