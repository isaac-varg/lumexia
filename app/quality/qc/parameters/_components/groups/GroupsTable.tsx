'use client'

import Card from "@/components/Card";
import DataTable from "@/components/DataTable";
import useDialog from "@/hooks/useDialog";
import { groupColumns } from "./GroupColumns";
import GroupFormDialog from "./GroupFormDialog";
import { useQcParameterSelection } from "@/store/qcParametersSlice";
import { useRouter } from "next/navigation";

const GroupsTable = () => {

  const dialog = useDialog()
  const router = useRouter()
  const { groups, examinationTypes } = useQcParameterSelection()


  const handleRowClick = (row: any) => {

    const path = `/quality/qc/parameters/groups/${row.original.name}?id=${row.original.id}`
    router.push(path)
  }


  return (
    <Card.Root>

      <GroupFormDialog examinationTypes={examinationTypes} />
      <div className="flex justify-between items-center">
        <Card.Title>Groups</Card.Title>
        <button className="btn btn-neutral btn-soft" onClick={() => dialog.showDialog('newQcGroup')}>Add Group</button>
      </div>
      <DataTable.Default
        data={groups}
        columns={groupColumns}
        onRowClick={(row) => handleRowClick(row)}
        tableStateName='qcGroups'
      />
    </Card.Root>
  )
}

export default GroupsTable 
