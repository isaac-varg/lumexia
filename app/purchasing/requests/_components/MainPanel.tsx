'use client'
import React, { useState } from 'react'
import ModeMenu from './ModeMenu'
import RequestsTable from './RequestsTable'
import RequestsCalendar from './RequestsCalendar'
import { RequestForDashboard } from '../_functions/getRequests'


type MainPanelProps = {
    requests: RequestForDashboard[]
}

const MainPanel = ({ requests }: MainPanelProps) => {

    const [mode, setMode] = useState<"table" | "calendar">("table")

    return (
        <div className='flex flex-col gap-y-4'>
            <ModeMenu setMode={setMode} mode={mode} />

            {mode === "table" && <RequestsTable requests={requests} />}

            {mode === 'calendar' && <RequestsCalendar requests={requests} />}

        </div>
    )
}

export default MainPanel
