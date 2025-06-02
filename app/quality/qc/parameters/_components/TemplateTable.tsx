'use client'
import { QcTemplate } from "@/actions/quality/qc/templates/getAll"
import Card from "@/components/Card";
import DataTable from "@/components/DataTable";
import { Filter } from "@/types/filter";
import { templateColumns } from "./TemplateColumns";
import TemplateFormDialog from "./TemplateFormDialog";
import useDialog from "@/hooks/useDialog";
import ModifyTemplateDialog from "./ModifyTemplateDialog";
import { useState } from "react";

const TemplateTable = ({ templates }: { templates: QcTemplate[] }) => {


    const dialog = useDialog()
    const [selectedTemplate, setSelectedTemplate] = useState<QcTemplate | null>(null)


    const handleRowClick = (row: any) => {
        setSelectedTemplate(row.original);
        dialog.showDialog('modifyTemplateDialog');
    }


    return (
        <Card.Root>
            <ModifyTemplateDialog template={selectedTemplate} />

            <TemplateFormDialog />
            <div className="flex justify-between items-center">
                <Card.Title>Template</Card.Title>
                <button className="btn" onClick={() => dialog.showDialog('newQcTemplate')}>Add Template</button>
            </div>
            <DataTable.Default
                data={templates}
                columns={templateColumns}
                onRowClick={(row) => handleRowClick(row)}
                tableStateName='itemPricingExamiantions'
            />
        </Card.Root>
    )
}

export default TemplateTable
