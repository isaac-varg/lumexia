'use client'
import Card from "@/components/Card";
import DataTable from "@/components/DataTable";
import useDialog from "@/hooks/useDialog";
import { useState } from "react";
import { QcParameterGroup } from "@prisma/client";
import { groupColumns } from "./GroupColumns";
import GroupFormDialog from "./GroupFormDialog";
import { ExaminationType } from "@/actions/quality/qc/examinationTypes/getAll";

const GroupsTable = ({ groups, examinationTypes }: { groups: QcParameterGroup[], examinationTypes: ExaminationType[] }) => {


    const dialog = useDialog()
    const [selectedGroup, setSelectedGroup] = useState<QcParameterGroup | null>(null)


    const handleRowClick = (row: any) => {
        setSelectedGroup(row.original);
        dialog.showDialog('modifyGroupDialog');
    }


    return (
        <Card.Root>
            {/*<ModifyTemplateDialog template={selectedTemplate} /> */}

            <GroupFormDialog examinationTypes={examinationTypes} />
            <div className="flex justify-between items-center">
                <Card.Title>Groups</Card.Title>
                <button className="btn" onClick={() => dialog.showDialog('newQcGroup')}>Add Group</button>
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
