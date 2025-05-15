"use client"
import { PricingExamination } from '@/actions/accounting/examinations/getAllByItem';
import Card from '@/components/Card'
import DataTable from '@/components/DataTable'
import { Filter } from '@/types/filter';
import { toFacetFilter } from '@/utils/data/toFacetFilter';
import React from 'react'
import { examinationColumns } from './ExaminationsColumns';
import { useRouter } from 'next/navigation';

const ExaminationsTable = ({ pricingExaminations }: { pricingExaminations: PricingExamination[] }) => {

    const router = useRouter()

    const filters: Filter[] = [
        {
            columnName: "userName",
            filterLabel: "Conducted By",
            options: toFacetFilter(pricingExaminations, "user.id", "user.name"),
        },
    ];


    return (
        <Card.Root>
            <Card.Title>Examinations</Card.Title>

            <DataTable.Default
                data={pricingExaminations}
                filters={filters}
                columns={examinationColumns}
                onRowClick={(row) => router.push(`/accounting/pricing/details?id=${row.original.id}`)}
                tableStateName='itemPricingExamiantions'
            />
        </Card.Root>
    )
}

export default ExaminationsTable
