"use client"

import { useState } from "react"
import StatusBoard from "./statusBoard/StatusBoard"
import { BprStatus } from "@/types/bprStatus"
import ListMode from "./list/ListMode"
import { PlanningIBpr } from "../_functions/getBprs"
import ViewModeButton from "./ViewModeButton"
import CalendarMode from "./calendar/CalendarMode"
import { usePanelSelection } from "@/store/panelSelectionSlice"

type ViewModeProps = {
    bprs: PlanningIBpr[]
    statuses: BprStatus[]

}

export type BprPlanningViewMode = "statusBoard" | "list" | "calendar"

const ViewMode = ({ bprs, statuses }: ViewModeProps) => {

    const { planningDashboard } = usePanelSelection()
    const [viewMode, setViewMode] = useState<BprPlanningViewMode>(planningDashboard)


    return (
        <div className="flex flex-col gap-y-6">
            <div className="flex items-center justify-start gap-x-4">
                <ViewModeButton viewMode="list" onClick={setViewMode} activeViewMode={viewMode}>List</ViewModeButton>
                <ViewModeButton viewMode="statusBoard" onClick={setViewMode} activeViewMode={viewMode}>Board</ViewModeButton>
                <ViewModeButton viewMode="calendar" onClick={setViewMode} activeViewMode={viewMode}>Calendar</ViewModeButton>
            </div>
            {viewMode === 'list' && <ListMode bprs={bprs} />}
            {viewMode === 'statusBoard' && <StatusBoard bprs={bprs as any} statuses={statuses} />}
            {viewMode === 'calendar' && <CalendarMode bprs={bprs} />}
        </div>
    )
}

export default ViewMode
