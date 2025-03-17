"use client"
import { PricingExamination } from '@/actions/accounting/examinations/getAllByItem';
import Card from '@/components/Card'
import DataTable from '@/components/DataTable'
import { Filter } from '@/types/filter';
import { toFacetFilter } from '@/utils/data/toFacetFilter';
import React from 'react'
import { examinationColumns } from './ExaminationsColumns';

const ExaminationsTable = ({ pricingExaminations }: { pricingExaminations: PricingExamination[] }) => {

    const filters: Filter[] = [
        {
            columnName: "user.name",
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
                onRowClick={(row) => console.log(row)}
                tableStateName='itemPricingExamiantions'
            />
        </Card.Root>
    )
}

export default ExaminationsTable
