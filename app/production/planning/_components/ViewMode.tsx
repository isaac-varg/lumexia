"use client"

import { useState } from "react"
import StatusBoard from "./statusBoard/StatusBoard"
import { BprStatus } from "@/types/bprStatus"
import ListMode from "./list/ListMode"
import { PlanningIBpr } from "../_functions/getBprs"
import ViewModeButton from "./ViewModeButton"

type ViewModeProps = {
    bprs: PlanningIBpr[]
    statuses: BprStatus[]

}

export type BprPlanningViewMode = "statusBoard" | "list"

const ViewMode = ({ bprs, statuses }: ViewModeProps) => {

    const [viewMode, setViewMode] = useState<BprPlanningViewMode>("list")


    return (
        <div className="flex flex-col gap-y-6">
            <div className="flex items-center justify-start gap-x-4">
                <ViewModeButton viewMode="list" onClick={setViewMode} activeViewMode={viewMode}>List</ViewModeButton>
                <ViewModeButton viewMode="statusBoard" onClick={setViewMode} activeViewMode={viewMode}>Board</ViewModeButton>
            </div>
            {viewMode === 'list' && <ListMode bprs={bprs} />}
            {viewMode === 'statusBoard' && <StatusBoard bprs={bprs as any} statuses={statuses} />}
        </div>
    )
}

export default ViewMode
