'use client'

import { QcParameter } from "@/actions/quality/qc/parameters/getAll";
import Card from "@/components/Card";
import DataTable from "@/components/DataTable";
import { Filter } from "@/types/filter";
import { parameterColumns } from "./ParameterColumns";
import { useRouter } from "next/navigation";
import { QcTemplate } from "@/actions/quality/qc/templates/getAll";
import { useState } from "react";
import TemplateParameterLinkDialog from "./TemplateParameterLinkDialog";
import useDialog from "@/hooks/useDialog";
import { QcParameterGroup } from "@/actions/quality/qc/groups/getAll";

const ParameterTable = ({ parameters, templates, groups }: { parameters: QcParameter[], templates: QcTemplate[], groups: QcParameterGroup[] }) => {

    const router = useRouter()
    const [selectedParameter, setSelectedParameter] = useState<QcParameter | null>(null)
    const { showDialog } = useDialog()

    const filters: Filter[] = [
        {
            columnName: "isWetParameter",
            filterLabel: "Is Wet Parameter",
            options: [{ value: true, label: 'True' }, { value: false, label: 'False' }]
        },
    ];


    return (
        <Card.Root>
            <TemplateParameterLinkDialog templates={templates} selectedParameter={selectedParameter} groups={groups} />
            <div className="flex justify-between items-center">
                <Card.Title>Parameters</Card.Title>
                <button className="btn" onClick={() => router.push('/quality/qc/parameters/new')}>Add Parameter</button>
            </div>
            <DataTable.Default
                data={parameters}
                filters={filters}
                columns={parameterColumns}
                onRowClick={(row) => {
                    setSelectedParameter(row.original);
                    showDialog('templateParameterLink');
                }}
                tableStateName='itemPricingExamiantions'
            />
        </Card.Root>

    )
}

export default ParameterTable
