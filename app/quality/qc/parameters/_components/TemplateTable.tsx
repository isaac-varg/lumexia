'use client'
import { QcTemplate } from "@/actions/quality/qc/templates/getAll"
import Card from "@/components/Card";
import DataTable from "@/components/DataTable";
import { Filter } from "@/types/filter";
import { templateColumns } from "./TemplateColumns";
import TemplateFormDialog from "./TemplateFormDialog";
import useDialog from "@/hooks/useDialog";

const TemplateTable = ({ templates }: { templates: QcTemplate[] }) => {


    const dialog = useDialog()
    const filters: Filter[] = [
        {
            columnName: "isWetParameter",
            filterLabel: "Is Wet Parameter",
            options: [{ value: true, label: 'True' }, { value: false, label: 'False' }]
        },
    ];


    return (
        <Card.Root>
            
            <TemplateFormDialog />
            <div className="flex justify-between items-center">
                <Card.Title>Template</Card.Title>
                <button className="btn" onClick={() => dialog.showDialog('newQcTemplate')}>Add Template</button>
            </div>
            <DataTable.Default
                data={templates}
                filters={filters}
                columns={templateColumns}
                onRowClick={() => console.log('af')}
                tableStateName='itemPricingExamiantions'
            />
        </Card.Root>
    )
}

export default TemplateTable
