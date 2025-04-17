'use client'
import { PricingExaminationAll } from '@/actions/accounting/examinations/getAll'
import DataTable from '@/components/DataTable'
import React from 'react'
import { latestExaminationsColumns } from './LatestExaminationsColumns'
import { Filter } from '@/types/filter'
import { toFacetFilter } from '@/utils/data/toFacetFilter'
import { useRouter } from 'next/navigation'

const LatestExaminationsTable = ({ examinations }: { examinations: PricingExaminationAll[] }) => {

    const router = useRouter()
    const filters: Filter[] = [
        {
            columnName: "examinedItem",
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
                onRowClick={(row) => router.push(`/accounting/pricing/details?id=${row.original.id}`)}
            />
        </div>
    )
}

export default LatestExaminationsTable
