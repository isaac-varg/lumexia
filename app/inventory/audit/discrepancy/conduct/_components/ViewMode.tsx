'use client'
import { useDiscrepancySelection } from "@/store/discrepancySlice"
import ActionsPanel from "./ActionsPanel"
import AuditItemTable from "./AuditItemTable"

const ViewMode = () => {
    const { mode } = useDiscrepancySelection()



    if (mode !== 'view') return false
    return (
        <div className="grid grid-cols-3 gap-6">


            <ActionsPanel />


            <AuditItemTable />

        </div>
    )
}

export default ViewMode
