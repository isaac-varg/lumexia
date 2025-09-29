'use client'
import Card from "@/components/Card";
import DataTable from "@/components/DataTable";
import { templateColumns } from "./TemplateColumns";
import TemplateFormDialog from "./TemplateFormDialog";
import useDialog from "@/hooks/useDialog";
import { useQcParameterSelection } from "@/store/qcParametersSlice";
import { useRouter } from "next/navigation";

const TemplateTable = () => {
  const dialog = useDialog()
  const router = useRouter()
  const { templates } = useQcParameterSelection()

  const handleRowClick = (row: any) => {
    router.push(`/quality/qc/parameters/template/${row.original.name}?id=${row.original.id}`)
  }


  return (
    <Card.Root>

      <TemplateFormDialog />
      <div className="flex justify-between items-center">
        <Card.Title>Template</Card.Title>
        <button className="btn btn-neutral btn-soft" onClick={() => dialog.showDialog('newQcTemplate')}>Add Template</button>
      </div>
      <DataTable.Default
        data={templates}
        columns={templateColumns}
        onRowClick={(row) => handleRowClick(row)}
        tableStateName='qcTemplates'
      />
    </Card.Root>
  )
}

export default TemplateTable
