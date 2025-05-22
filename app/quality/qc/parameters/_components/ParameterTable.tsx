'use client'

import { QcParameter } from "@/actions/quality/qc/parameters/getAll";
import Card from "@/components/Card";
import DataTable from "@/components/DataTable";
import { Filter } from "@/types/filter";
import { parameterColumns } from "./ParameterColumns";

const ParameterTable = ({ parameters }: { parameters: QcParameter[] }) => {

    const filters: Filter[] = [
        {
            columnName: "isWetParameter",
            filterLabel: "Is Wet Parameter",
            options: [{ value: true, label: 'True' }, { value: false, label: 'False' }]
        },
    ];


    return (
        <Card.Root>
            <Card.Title>Parameters</Card.Title>

            <DataTable.Default
                data={parameters}
                filters={filters}
                columns={parameterColumns}
                onRowClick={(row) => console.log(`/accounting/pricing/details?id=${row.original.id}`)}
                tableStateName='itemPricingExamiantions'
            />
        </Card.Root>

    )
}

export default ParameterTable
